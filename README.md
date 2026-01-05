# KN BioSciences ERP API Client

A robust TypeScript API client library for the KN BioSciences ERP system, featuring OAuth2 authentication, automatic token refresh, request/response validation, and comprehensive error handling.

## Features

- 🔐 **OAuth2 Authentication** with automatic token refresh.
- ✅ **Schema Validation** using Zod for type-safe requests and responses.
- 🔄 **Automatic Retry Logic** with exponential backoff for idempotent requests.
- 🛡️ **Comprehensive Error Handling** with custom `ApiError` types.
- 📡 **HTTP Interceptors** for seamless authentication integration.
- 📦 **TypeScript First** with full type definitions for ERP models.
- 🏗️ **Modular Architecture** for easy extension and phase-based development.

## Installation

```bash
npm install
```

## Quick Start

### Basic Setup

```typescript
import { Client } from './src/api/client';
import { AuthService } from './src/api/auth';

// 1. Initialize Auth Service
const authConfig = {
    loginUrl: 'https://api.knbiosciences.com/auth/login',
    tokenUrl: 'https://api.knbiosciences.com/auth/token',
    registerUrl: 'https://api.knbiosciences.com/auth/register',
    client_id: 'your_client_id',
    client_secret: 'your_client_secret'
};
const authService = new AuthService(authConfig);

// 2. Initialize API Client
const apiClient = new Client({
    baseURL: 'https://api.knbiosciences.com/v1',
    headers: { 'Content-Type': 'application/json' }
});

// 3. Attach Interceptor
authService.setupInterceptor(apiClient);
```

### Authentication Flow

```typescript
// Login
await authService.login('username', 'password');

// Logout
authService.logout();

// Register
await authService.register({
    username: 'newuser',
    email: 'user@example.com',
    password: 'securepassword123'
});
```

### Resource Management (Phase 1: Extended Models)

```typescript
import { OrderService } from './src/api/orders';

const orderService = new OrderService(apiClient, {
    rfqThreshold: 10000,
    ordersEndpoint: '/orders'
});

// Create Order (Automatically handles RFQ if above threshold)
const order = await orderService.createOrder({
    items: [{ product_id: 'p1', quantity: 10, unit_price: 150 }],
    customer_id: 'c1',
    status: 'pending'
});
```

## Data Models & Validation

We use Zod for runtime validation. Typical models include:
- `IProduct`, `IIntegratedProduct`
- `IOrder`, `IEnhancedOrder`
- `IUserProfile`, `IFarmProfile`
- `IPricingRule` (Smart Pricing Engine)

Schemas are available in `src/schemas/models.ts`.

## Development Phases

1. **Phase 1**: Extended data models for integrated products and user roles. (✅ Completed)
2. **Phase 2**: Implement Smart Pricing Engine with basic rules.
3. **Phase 3**: Build B2B dealer portal features.
4. **Phase 4**: Develop B2C farmer interface.
5. **Phase 5**: Add advanced pricing algorithms and analytics.
6. **Phase 6**: Integrate farm management with product recommendations.

## Testing

Run tests using Jest:

```bash
npm test
```

## Contribution

Please ensure all new models have corresponding Zod schemas in `src/schemas/` and unit tests in `tests/`.
