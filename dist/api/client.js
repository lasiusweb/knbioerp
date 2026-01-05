"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.ApiError = void 0;
const retry_1 = require("../utils/retry");
/**
 * Structure for a standardized Error thrown by the client.
 */
class ApiError extends Error {
    constructor(status, statusText, body) {
        super(`API Error ${status}: ${statusText}`);
        this.status = status;
        this.statusText = statusText;
        this.body = body;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
/**
 * API Client Class.
 * Provides a centralized, type-safe interface for HTTP operations.
 */
class Client {
    constructor(config) {
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
    async request(method, endpoint, options = {}) {
        // 1. Construct URL
        const url = new URL(`${this._baseURL}${endpoint}`);
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => url.searchParams.set(key, String(value)));
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
        const requestOptions = {
            method,
            headers: requestHeaders,
            body: options.body,
            signal: controller.signal,
            ...options // Allow spreading standard properties like cache mode
        };
        // Remove non-standard properties before passing to fetch
        delete requestOptions.params;
        delete requestOptions.timeout;
        try {
            // 4. Route to Fetch Strategy
            let response;
            // Strategy: Retry safe GET requests, fire-once for Mutations
            if (method === 'GET' || method === 'HEAD') {
                console.debug(`[Client] Fetching GET ${url.toString()} with retry logic.`);
                response = await (0, retry_1.fetchWithRetry)(url.toString());
            }
            else {
                console.debug(`[Client] Fetching ${method} ${url.toString()} (No Retry)`);
                response = await fetch(url.toString(), requestOptions);
            }
            clearTimeout(timeoutId);
            // 5. Error Handling
            if (!response.ok) {
                const bodyText = await response.text();
                throw new ApiError(response.status, response.statusText, JSON.parse(bodyText || '{}'));
            }
            // 6. Return Typed Data
            // Note: We assume standard JSON. If content type varies, this needs adjustment.
            return response.json();
        }
        catch (error) {
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
    async get(endpoint, options = {}) {
        return this.request('GET', endpoint, options);
    }
    /**
     * HTTP POST
     * Fires immediately without retry.
     */
    async post(endpoint, options = {}) {
        return this.request('POST', endpoint, {
            ...options,
            body: JSON.stringify(options.body) // Auto-stringify JSON payloads
        });
    }
    /**
     * HTTP PUT
     * Fires immediately without retry.
     */
    async put(endpoint, options = {}) {
        return this.request('PUT', endpoint, {
            ...options,
            body: JSON.stringify(options.body)
        });
    }
    /**
     * HTTP DELETE
     * Fires immediately without retry.
     */
    async delete(endpoint, options = {}) {
        return this.request('DELETE', endpoint, options);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map