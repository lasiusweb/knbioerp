import { Client, IRequestOptions, ApiError } from './client';
import { TokenResponseSchema, RegistrationRequestSchema, RegistrationResponseSchema, TokenResponse as ITokenResponse } from '../schemas/auth';
export type { ITokenResponse };

/**
 * Configuration for authentication endpoints and credentials.
 */
export interface IAuthConfig {
  /** Endpoint for user registration. */
  registerUrl: string;
  /** Endpoint for acquiring new tokens. */
  loginUrl: string;
  /** Endpoint for refreshing expired access tokens. */
  tokenUrl: string;
  /** API Client ID / App ID. */
  client_id: string;
  /** API Client Secret. */
  client_secret: string;
}

/**
 * Service for managing authentication state and intercepting API requests.
 * Handles automatic token refresh and error injection.
 */
export class AuthService {
  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;
  private _tokenExpiryTime: number = 0;

  // Promise lock to prevent multiple simultaneous refreshes
  private _refreshingPromise: Promise<void> | null = null;

  constructor(private _config: IAuthConfig) { }

  /**
   * Retrieves the current valid access token.
   * Throws an error if not authenticated.
   */
  private _getAccessToken(): string {
    if (!this._accessToken) {
      throw new Error('Not authenticated. Please login.');
    }

    // Check expiry with a 60s buffer
    const isExpired = Date.now() > this._tokenExpiryTime;
    if (isExpired) {
      throw new Error('Access token expired.');
    }

    return this._accessToken;
  }

  /**
   * Authenticates the user with username and password.
   * Stores tokens in memory for subsequent requests.
   *
   * @param username - User identifier.
   * @param password - User secret.
   */
  public async login(username: string, password: string): Promise<void> {
    const response = await fetch(this._config.loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: this._config.client_id,
        client_secret: this._config.client_secret,
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
    }

    const data = await response.json();
    const validatedData = TokenResponseSchema.parse(data);
    this._processTokens(validatedData);
  }

  /**
   * Manages the OAuth2 refresh flow.
   * Ensures only one refresh request happens at a time (Race Condition Prevention).
   */
  private async _refresh(): Promise<void> {
    if (this._refreshingPromise) {
      return this._refreshingPromise;
    }

    // Start the refresh process
    this._refreshingPromise = (async () => {
      if (!this._refreshToken) {
        throw new Error('No refresh token available. Please re-login.');
      }

      const response = await fetch(this._config.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: this._refreshToken,
          client_id: this._config.client_id,
          client_secret: this._config.client_secret,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
      }

      const data = await response.json();
      const validatedData = TokenResponseSchema.parse(data);
      this._processTokens(validatedData);
    })();

    try {
      await this._refreshingPromise;
    } finally {
      // Reset lock after completion (success or failure)
      this._refreshingPromise = null;
    }
  }

  /**
   * Internal helper to update state from token response.
   */
  private _processTokens(data: ITokenResponse): void {
    this._accessToken = data.access_token;
    this._refreshToken = data.refresh_token;
    // Set expiry time (current + expires_in - 60s buffer)
    this._tokenExpiryTime = Date.now() + (data.expires_in * 1000) - 60000;

    console.log('[AuthService] Tokens updated. Expires at', new Date(this._tokenExpiryTime).toISOString());
  }

  /**
   * Registers a new user account.
   *
   * @param userData - User registration data.
   * @returns Promise<RegistrationResponse> - Registration result.
   */
  public async register(userData: { username: string; email: string; password: string }): Promise<any> {
    // Validate input
    const validatedInput = RegistrationRequestSchema.parse(userData);

    const response = await fetch(this._config.registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedInput),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return RegistrationResponseSchema.parse(data);
  }

  /**
   * Logs out the current user by clearing stored tokens.
   */
  public logout(): void {
    this._accessToken = null;
    this._refreshToken = null;
    this._tokenExpiryTime = 0;
    console.log('[AuthService] User logged out. Tokens cleared.');
  }

  /**
   * Attaches the authentication interceptor to the provided Client instance.
   * Wraps the Client's internal request method to inject headers and handle 401s.
   *
   * @param apiClient - The API Client to intercept.
   */
  public setupInterceptor(apiClient: Client): void {
    // We need to wrap the client's core request logic.
    const originalRequest = (apiClient as any)['request'].bind(apiClient) as <T>(method: string, endpoint: string, options?: IRequestOptions) => Promise<T>;

    // Override request (TypeScript hack for private method access)
    (apiClient as any)['request'] = async <T>(
      method: string,
      endpoint: string,
      options: IRequestOptions = {}
    ): Promise<T> => {
      // Retry loop for handling 401 Unauthorized errors
      // Limit to 2 retries to avoid infinite loops
      for (let attempt = 0; attempt <= 2; attempt++) {
        try {
          // Prepare Headers
          const authHeaders: Record<string, string> = {};
          try {
            const token = this._getAccessToken();
            authHeaders['Authorization'] = `Bearer ${token}`;
          } catch (err) {
            // If not authenticated or expired, proceed without header on first attempt
            if (attempt === 0) {
              console.warn('[AuthService] No valid token available. Attempting request anyway.');
            } else {
              throw err;
            }
          }

          // Merge Auth headers with existing options
          const mergedOptions: IRequestOptions = {
            ...options,
            headers: {
              ...options.headers,
              ...authHeaders
            }
          };

          // Execute original request
          return await originalRequest<T>(method, endpoint, mergedOptions);
        } catch (error) {
          // Check for 401 Unauthorized error
          if (error instanceof ApiError && error.status === 401) {
            console.warn(`[AuthService] Attempt ${attempt + 1}: 401 Unauthorized. Refreshing token...`);

            // Only refresh if we haven't tried yet in this loop
            if (attempt === 0) {
              try {
                await this._refresh();
                // Continue to next loop iteration (retry)
                continue;
              } catch (refreshError) {
                console.error('[AuthService] Token refresh failed.', refreshError);
                throw refreshError;
              }
            }
          }

          // If it's a network error or other failure, or 401 refresh failed
          throw error;
        }
      }

      throw new Error('Request failed after retries.');
    };
  }
}
