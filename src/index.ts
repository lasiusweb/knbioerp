/**
 * Main entry point for the KN Biosciences API Client Library.
 * Exports all public APIs for authentication, HTTP client, data models, and types.
 */

// Export API Client and related types
export { Client, ApiError, type IClientConfig, type IRequestOptions } from './api/client';

// Export Authentication Service and types
export { AuthService, type IAuthConfig, type ITokenResponse } from './api/auth';

// Export Order Service and types
export { OrderService, type IOrderConfig } from './api/orders';

// Export Pricing Service and types
export { PricingService, type IPricingConfig } from './api/pricing';

// Export Dealer Service and types
export { DealerService, type IDealerConfig } from './api/dealer';

// Export Farmer Service and types
export { FarmerService, type IFarmerConfig } from './api/farmer';

// Export Pricing Analytics Service and types
export { PricingAnalyticsService, type IPricingTrend } from './api/analytics';

// Export data models
export * from './models';

// Export Agri-Aqua types
export * from './types/agri-aqua';

// Export validation schemas
export * from './schemas';

// Export utility functions
export * from './utils';