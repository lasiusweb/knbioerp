/**
 * Main entry point for the KN Biosciences API Client Library.
 * Exports all public APIs for authentication, HTTP client, data models, and types.
 */

// Export API Client and related types
export { Client, ApiError, type IClientConfig, type IRequestOptions } from './api/client';

// Export Authentication Service and types
export { AuthService, type IAuthConfig, type ITokenResponse } from './api/auth';

// Export data models
export * from './models';

// Export Agri-Aqua types
export * from './types/agri-aqua';

// Export validation schemas
export * from './schemas';

// Export utility functions
export { fetchWithRetry } from './utils/retry';