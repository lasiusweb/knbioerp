/**
 * Configuration interface for the API Client.
 */
export interface IClientConfig {
    /** The base URL for all API requests (e.g., https://api.example.com/v1) */
    baseURL: string;
    /** Default headers to include with every request (e.g., Authorization) */
    headers: HeadersInit;
    /** Global timeout in milliseconds. Defaults to 10000 (10s) */
    timeout?: number;
}
/**
 * Standard interface for API Options, extending native RequestInit.
 */
export interface IRequestOptions extends RequestInit {
    /** Query parameters to append to the URL. */
    params?: Record<string, string | number>;
    /** Overrides the global timeout for this specific request. */
    timeout?: number;
}
/**
 * Structure for a standardized Error thrown by the client.
 */
export declare class ApiError extends Error {
    status: number;
    statusText: string;
    body: unknown;
    constructor(status: number, statusText: string, body: unknown);
}
/**
 * API Client Class.
 * Provides a centralized, type-safe interface for HTTP operations.
 */
export declare class Client {
    private readonly _baseURL;
    private readonly _headers;
    private readonly _timeout;
    constructor(config: IClientConfig);
    /**
     * Generic request method.
     * Handles URL construction, timeout, and routing to specific HTTP methods.
     *
     * @param method - The HTTP method (GET, POST, etc.)
     * @param endpoint - The API endpoint path.
     * @param options - Optional parameters, body, or headers.
     * @returns Promise<T> - The typed response data.
     */
    private request;
    /**
     * HTTP GET
     * Uses retry logic for resilience.
     */
    get<T>(endpoint: string, options?: IRequestOptions): Promise<T>;
    /**
     * HTTP POST
     * Fires immediately without retry.
     */
    post<T>(endpoint: string, options?: IRequestOptions): Promise<T>;
    /**
     * HTTP PUT
     * Fires immediately without retry.
     */
    put<T>(endpoint: string, options?: IRequestOptions): Promise<T>;
    /**
     * HTTP DELETE
     * Fires immediately without retry.
     */
    delete<T>(endpoint: string, options?: IRequestOptions): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map