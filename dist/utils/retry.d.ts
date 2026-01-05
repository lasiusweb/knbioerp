/**
 * Utility wrapper for fetching data with exponential backoff retry logic.
 * Intended for idempotent requests (GET, HEAD).
 *
 * @param input - The standard RequestInfo object.
 * @param maxRetries - Maximum number of retry attempts. Defaults to 3.
 * @returns Promise<Response>
 */
export declare const fetchWithRetry: (input: RequestInfo, maxRetries?: number) => Promise<Response>;
//# sourceMappingURL=retry.d.ts.map