"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithRetry = void 0;
/**
 * Utility wrapper for fetching data with exponential backoff retry logic.
 * Intended for idempotent requests (GET, HEAD).
 *
 * @param input - The standard RequestInfo object.
 * @param maxRetries - Maximum number of retry attempts. Defaults to 3.
 * @returns Promise<Response>
 */
const fetchWithRetry = async (input, maxRetries = 3) => {
    const retryDelay = (attempt) => {
        return Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s...
    };
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch(input);
            // Check for Server Errors (5xx) which might be transient
            if (response.status >= 500 && response.status < 600 && attempt < maxRetries) {
                console.warn(`[Retry] Attempt ${attempt + 1} failed with status ${response.status}. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay(attempt)));
                continue;
            }
            return response;
        }
        catch (error) {
            // Check for Network Errors (fetch throws on connection failure)
            const isNetworkError = error instanceof TypeError;
            if (isNetworkError && attempt < maxRetries) {
                console.warn(`[Retry] Network error on attempt ${attempt + 1}. Retrying...`);
                await new Promise(resolve => setTimeout(resolve, retryDelay(attempt)));
                continue;
            }
            // If it's not a network error or we're out of retries, fail hard
            throw error;
        }
    }
    throw new Error(`Max retries (${maxRetries}) exceeded.`);
};
exports.fetchWithRetry = fetchWithRetry;
//# sourceMappingURL=retry.js.map