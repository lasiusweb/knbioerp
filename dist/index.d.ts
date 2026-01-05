/**
 * Main entry point for the KN Biosciences API Client Library.
 * Exports all public APIs for authentication, HTTP client, data models, and types.
 */
export { Client, ApiError, type IClientConfig, type IRequestOptions } from './api/client';
export { AuthService, type IAuthConfig, type ITokenResponse } from './api/auth';
export * from './models';
export * from './types/agri-aqua';
export * from './schemas';
export { fetchWithRetry } from './utils/retry';
//# sourceMappingURL=index.d.ts.map