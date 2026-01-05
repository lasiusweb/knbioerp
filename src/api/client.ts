import { fetchWithRetry } from '../utils/retry';

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
export interface IRequestOptions extends Omit<RequestInit, 'body'> {
    /** Query parameters to append to the URL. */
    params?: Record<string, string | number>;
    /** Overrides the global timeout for this specific request. */
    timeout?: number;
    /** The request body. Can be an object (will be stringified) or standard BodyInit. */
    body?: any;
}

/**
 * Structure for a standardized Error thrown by the client.
 */
export class ApiError extends Error {
    constructor(
        public status: number,
        public statusText: string,
        public body: unknown
    ) {
        super(`API Error ${status}: ${statusText}`);
        this.name = 'ApiError';
    }
}

/**
 * API Client Class.
 * Provides a centralized, type-safe interface for HTTP operations.
 */
export class Client {
    private readonly _baseURL: string;
    private readonly _headers: Headers;
    private readonly _timeout: number;

    constructor(config: IClientConfig) {
        this._baseURL = config.baseURL.replace(/\/$/, ''); // Remove trailing slash
        this._headers = new Headers(config.headers);
        this._timeout = config.timeout || 10000;
    }

    /**
     * Generic request method.
     * Handles URL construction, timeout, and routing to specific HTTP methods.
     *
     * @param method - The HTTP method (GET, POST, etc.)
     * @param endpoint - The API endpoint path.
     * @param options - Optional parameters, body, or headers.
     * @returns Promise<T> - The typed response data.
     */
    private async request<T>(
        method: string,
        endpoint: string,
        options: IRequestOptions = {}
    ): Promise<T> {
        // 1. Construct URL
        const url = new URL(`${this._baseURL}${endpoint}`);
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) =>
                url.searchParams.set(key, String(value))
            );
        }

        // 2. Prepare Headers (Merge defaults with request-specific)
        const requestHeaders = new Headers(this._headers);
        if (options.headers) {
            const additionalHeaders = new Headers(options.headers);
            additionalHeaders.forEach((value, key) => requestHeaders.append(key, value));
        }

        // 3. Timeout Handling (AbortController)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || this._timeout);

        const requestOptions: RequestInit = {
            method,
            headers: requestHeaders,
            body: options.body,
            signal: controller.signal,
            ...options // Allow spreading standard properties like cache mode
        };

        // Remove non-standard properties before passing to fetch
        delete (requestOptions as any).params;
        delete (requestOptions as any).timeout;

        try {
            // 4. Route to Fetch Strategy
            let response: Response;

            // Strategy: Retry safe GET requests, fire-once for Mutations
            if (method === 'GET' || method === 'HEAD') {
                console.debug(`[Client] Fetching GET ${url.toString()} with retry logic.`);
                response = await fetchWithRetry(url.toString(), requestOptions);
            } else {
                console.debug(`[Client] Fetching ${method} ${url.toString()} (No Retry)`);
                response = await fetch(url.toString(), requestOptions);
            }

            clearTimeout(timeoutId);

            // 5. Error Handling
            if (!response.ok) {
                const bodyText = await response.text();
                throw new ApiError(
                    response.status,
                    response.statusText,
                    JSON.parse(bodyText || '{}')
                );
            }

            // 6. Return Typed Data
            // Note: We assume standard JSON. If content type varies, this needs adjustment.
            return response.json() as Promise<T>;

        } catch (error) {
            clearTimeout(timeoutId);

            // Rethrow with context if it's an Abort (Timeout)
            if (error instanceof DOMException && error.name === 'AbortError') {
                throw new ApiError(408, 'Request Timeout', { message: 'Client timed out' });
            }

            throw error;
        }
    }

    /**
     * HTTP GET
     * Uses retry logic for resilience.
     */
    public async get<T>(endpoint: string, options: IRequestOptions = {}): Promise<T> {
        return this.request<T>('GET', endpoint, options);
    }

    /**
     * HTTP POST
     * Fires immediately without retry.
     */
    public async post<T>(endpoint: string, options: IRequestOptions = {}): Promise<T> {
        return this.request<T>('POST', endpoint, {
            ...options,
            body: JSON.stringify(options.body) // Auto-stringify JSON payloads
        });
    }

    /**
     * HTTP PUT
     * Fires immediately without retry.
     */
    public async put<T>(endpoint: string, options: IRequestOptions = {}): Promise<T> {
        return this.request<T>('PUT', endpoint, {
            ...options,
            body: JSON.stringify(options.body)
        });
    }

    /**
     * HTTP DELETE
     * Fires immediately without retry.
     */
    public async delete<T>(endpoint: string, options: IRequestOptions = {}): Promise<T> {
        return this.request<T>('DELETE', endpoint, options);
    }
}