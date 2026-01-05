"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("./client");
const auth_1 = require("../schemas/auth");
/**
 * Service for managing authentication state and intercepting API requests.
 * Handles automatic token refresh and error injection.
 */
class AuthService {
    constructor(_config) {
        this._config = _config;
        this._accessToken = null;
        this._refreshToken = null;
        this._tokenExpiryTime = 0;
        // Promise lock to prevent multiple simultaneous refreshes
        this._refreshingPromise = null;
    }
    /**
     * Retrieves the current valid access token.
     * Throws an error if not authenticated.
     */
    _getAccessToken() {
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
    async login(username, password) {
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
        const validatedData = auth_1.TokenResponseSchema.parse(data);
        this._processTokens(validatedData);
    }
    /**
     * Manages the OAuth2 refresh flow.
     * Ensures only one refresh request happens at a time (Race Condition Prevention).
     */
    async _refresh() {
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
            const validatedData = auth_1.TokenResponseSchema.parse(data);
            this._processTokens(validatedData);
        })();
        try {
            await this._refreshingPromise;
        }
        finally {
            // Reset lock after completion (success or failure)
            this._refreshingPromise = null;
        }
    }
    /**
     * Internal helper to update state from token response.
     */
    _processTokens(data) {
        this._accessToken = data.access_token;
        this._refreshToken = data.refresh_token;
        // Set expiry time (current + expires_in - 60s buffer)
        this._tokenExpiryTime = Date.now() + (data.expires_in * 1000) - 60000;
        console.log('[AuthService] Tokens updated. Expires at', new Date(this._tokenExpiryTime).toISOString());
    }
    /**
     * Attaches the authentication interceptor to the provided Client instance.
     * Wraps the Client's internal request method to inject headers and handle 401s.
     *
     * @param apiClient - The API Client to intercept.
     */
    setupInterceptor(apiClient) {
        // We need to wrap the client's core request logic.
        // Since the Client class is closed, we wrap its methods.
        const originalRequest = apiClient['request'].bind(apiClient);
        // Override request (TypeScript hack for private method access)
        apiClient['request'] = async (method, endpoint, options = {}) => {
            // Retry loop for handling 401 Unauthorized errors
            // Limit to 2 retries to avoid infinite loops
            for (let attempt = 0; attempt <= 2; attempt++) {
                try {
                    // Prepare Headers
                    const authHeaders = {};
                    try {
                        const token = this._getAccessToken();
                        authHeaders['Authorization'] = `Bearer ${token}`;
                    }
                    catch (err) {
                        // If not authenticated or expired, proceed without header
                        if (attempt === 0) {
                            console.warn('[AuthService] No token available. Proceeding unauthenticated.');
                        }
                        else {
                            // If we just refreshed but it still failed, stop
                            throw err;
                        }
                    }
                    // Merge Auth headers with existing options
                    const mergedOptions = {
                        ...options,
                        headers: {
                            ...options.headers,
                            ...authHeaders
                        }
                    };
                    // Execute original request
                    return await originalRequest(method, endpoint, mergedOptions);
                }
                catch (error) {
                    // Check for 401 Unauthorized error
                    if (error instanceof client_1.ApiError && error.status === 401) {
                        console.warn(`[AuthService] Attempt ${attempt + 1}: 401 Unauthorized. Refreshing token...`);
                        // Only refresh if we haven't tried yet in this loop
                        if (attempt === 0) {
                            await this._refresh();
                            // Continue to next loop iteration (retry)
                            continue;
                        }
                    }
                    // If it's a network error or other failure, or 401 refresh failed
                    throw error;
                }
            }
            // Should be unreachable, but satisfies type checkers
            throw new Error('Request failed after retries.');
        };
    }
}
exports.AuthService = AuthService;
;
;
;
//# sourceMappingURL=auth.js.map