import { Client } from './client';
/**
 * Configuration for authentication endpoints and credentials.
 */
export interface IAuthConfig {
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
 * Interface for the standard OAuth2 token response.
 */
export interface ITokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}
/**
 * Service for managing authentication state and intercepting API requests.
 * Handles automatic token refresh and error injection.
 */
export declare class AuthService {
    private _config;
    private _accessToken;
    private _refreshToken;
    private _tokenExpiryTime;
    private _refreshingPromise;
    constructor(_config: IAuthConfig);
    /**
     * Retrieves the current valid access token.
     * Throws an error if not authenticated.
     */
    private _getAccessToken;
    /**
     * Authenticates the user with username and password.
     * Stores tokens in memory for subsequent requests.
     *
     * @param username - User identifier.
     * @param password - User secret.
     */
    login(username: string, password: string): Promise<void>;
    /**
     * Manages the OAuth2 refresh flow.
     * Ensures only one refresh request happens at a time (Race Condition Prevention).
     */
    private _refresh;
    /**
     * Internal helper to update state from token response.
     */
    private _processTokens;
    /**
     * Attaches the authentication interceptor to the provided Client instance.
     * Wraps the Client's internal request method to inject headers and handle 401s.
     *
     * @param apiClient - The API Client to intercept.
     */
    setupInterceptor(apiClient: Client): void;
}
//# sourceMappingURL=auth.d.ts.map