# @knbiosciences/api-client

A robust TypeScript API client library for KN Biosciences ERP system, featuring OAuth2 authentication, automatic token refresh, request/response validation, and comprehensive error handling.

## Features

- 🔐 **OAuth2 Authentication** with automatic token refresh
- ✅ **Schema Validation** using Zod for type-safe requests and responses
- 🔄 **Automatic Retry Logic** with exponential backoff
- 🛡️ **Comprehensive Error Handling** with custom error types
- 📡 **HTTP Interceptors** for seamless auth integration
- 🧪 **Mock Server Support** using MSW for testing
- 📦 **TypeScript First** with full type definitions
- 🏗️ **Modular Architecture** for easy extension

## Installation

```bash
npm install @knbiosciences/api-client
```

or

```bash
pnpm add @knbiosciences/api-client
```

## Quick Start

### Basic Setup

```typescript
import { ApiClient, AuthService } from '@knbiosciences/api-client';

// Initialize auth service
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in'
});

// Initialize API client
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService
});
```

### Authentication Flow

```typescript
// Login
const tokens = await authService.login({
  username: 'user@example.com',
  password: 'password'
});

// The API client will automatically handle token refresh
// Make authenticated requests
const products = await apiClient.get('/products');
```

### User Registration

```typescript
const newUser = await authService.register({
  email: 'newuser@example.com',
  password: 'securepassword',
  firstName: 'John',
  lastName: 'Doe'
});
```

### Logout

```typescript
await authService.logout();
```

## API Usage

### GET Request

```typescript
const products = await apiClient.get('/products');
const product = await apiClient.get('/products/123');
```

### POST Request

```typescript
const newProduct = await apiClient.post('/products', {
  name: 'New Product',
  description: 'Product description',
  price: 99.99
});
```

### PUT Request

```typescript
const updatedProduct = await apiClient.put('/products/123', {
  name: 'Updated Product',
  price: 149.99
});
```

### DELETE Request

```typescript
await apiClient.delete('/products/123');
```

## Configuration

### AuthService Options

```typescript
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in',
  // Optional configurations
  tokenRefreshThreshold: 300, // seconds before expiry to refresh
  maxRetries: 3,
  retryDelay: 1000 // milliseconds
});
```

### ApiClient Options

```typescript
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService,
  // Optional configurations
  timeout: 10000, // milliseconds
  retries: 3,
  retryDelay: 1000,
  headers: {
    'X-API-Version': '1.0'
  }
});
```

## Data Models

The library includes TypeScript interfaces for common ERP entities:

```typescript
import type {
  Product,
  Batch,
  Order,
  User,
  ApiResponse
} from '@knbiosciences/api-client';

// Type-safe usage
const product: Product = {
  id: '123',
  name: 'Sample Product',
  description: 'Description',
  price: 99.99,
  category: 'Category A'
};
```

## Error Handling

```typescript
try {
  const data = await apiClient.get('/products');
} catch (error) {
  if (error instanceof AuthError) {
    // Handle authentication errors
    console.error('Authentication failed:', error.message);
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation failed:', error.details);
  } else if (error instanceof ApiError) {
    // Handle general API errors
    console.error('API Error:', error.status, error.message);
  }
}
```

## Mock Server Setup

For testing and development, you can set up a mock server using MSW:

```typescript
import { setupMockServer } from '@knbiosciences/api-client';

// Setup mock server
const server = setupMockServer();

// Start mock server
server.listen();

// Your tests here
const products = await apiClient.get('/products');

// Stop mock server
server.close();
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the KN Biosciences development team or create an issue in the repository.

---

**Homepage:** [https://www.knbiosciences.in](https://www.knbiosciences.in)
**Repository:** [https://github.com/knbiosciences/api-client](https://github.com/knbiosciences/api-client)

A robust TypeScript API client library for KN Biosciences ERP system, featuring OAuth2 authentication, automatic token refresh, request/response validation, and comprehensive error handling.

## Features

- 🔐 **OAuth2 Authentication** with automatic token refresh
- ✅ **Schema Validation** using Zod for type-safe requests and responses
- 🔄 **Automatic Retry Logic** with exponential backoff
- 🛡️ **Comprehensive Error Handling** with custom error types
- 📡 **HTTP Interceptors** for seamless auth integration
- 🧪 **Mock Server Support** using MSW for testing
- 📦 **TypeScript First** with full type definitions
- 🏗️ **Modular Architecture** for easy extension

## Installation

```bash
npm install @knbiosciences/api-client
```

or

```bash
pnpm add @knbiosciences/api-client
```

## Quick Start

### Basic Setup

```typescript
import { ApiClient, AuthService } from '@knbiosciences/api-client';

// Initialize auth service
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in'
});

// Initialize API client
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService
});
```

### Authentication Flow

```typescript
// Login
const tokens = await authService.login({
  username: 'user@example.com',
  password: 'password'
});

// The API client will automatically handle token refresh
// Make authenticated requests
const products = await apiClient.get('/products');
```

### User Registration

```typescript
const newUser = await authService.register({
  email: 'newuser@example.com',
  password: 'securepassword',
  firstName: 'John',
  lastName: 'Doe'
});
```

### Logout

```typescript
await authService.logout();
```

## API Usage

### GET Request

```typescript
const products = await apiClient.get('/products');
const product = await apiClient.get('/products/123');
```

### POST Request

```typescript
const newProduct = await apiClient.post('/products', {
  name: 'New Product',
  description: 'Product description',
  price: 99.99
});
```

### PUT Request

```typescript
const updatedProduct = await apiClient.put('/products/123', {
  name: 'Updated Product',
  price: 149.99
});
```

### DELETE Request

```typescript
await apiClient.delete('/products/123');
```

## Configuration

### AuthService Options

```typescript
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in',
  // Optional configurations
  tokenRefreshThreshold: 300, // seconds before expiry to refresh
  maxRetries: 3,
  retryDelay: 1000 // milliseconds
});
```

### ApiClient Options

```typescript
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService,
  // Optional configurations
  timeout: 10000, // milliseconds
  retries: 3,
  retryDelay: 1000,
  headers: {
    'X-API-Version': '1.0'
  }
});
```

## Data Models

The library includes TypeScript interfaces for common ERP entities:

```typescript
import type {
  Product,
  Batch,
  Order,
  User,
  ApiResponse
} from '@knbiosciences/api-client';

// Type-safe usage
const product: Product = {
  id: '123',
  name: 'Sample Product',
  description: 'Description',
  price: 99.99,
  category: 'Category A'
};
```

## Error Handling

```typescript
try {
  const data = await apiClient.get('/products');
} catch (error) {
  if (error instanceof AuthError) {
    // Handle authentication errors
    console.error('Authentication failed:', error.message);
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation failed:', error.details);
  } else if (error instanceof ApiError) {
    // Handle general API errors
    console.error('API Error:', error.status, error.message);
  }
}
```

## Mock Server Setup

For testing and development, you can set up a mock server using MSW:

```typescript
import { setupMockServer } from '@knbiosciences/api-client';

// Setup mock server
const server = setupMockServer();

// Start mock server
server.listen();

// Your tests here
const products = await apiClient.get('/products');

// Stop mock server
server.close();
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the KN Biosciences development team or create an issue in the repository.

---

**Homepage:** [https://www.knbiosciences.in](https://www.knbiosciences.in)
**Repository:** [https://github.com/knbiosciences/api-client](https://github.com/knbiosciences/api-client)

A robust TypeScript API client library for KN Biosciences ERP system, featuring OAuth2 authentication, automatic token refresh, request/response validation, and comprehensive error handling.

## Features

- 🔐 **OAuth2 Authentication** with automatic token refresh
- ✅ **Schema Validation** using Zod for type-safe requests and responses
- 🔄 **Automatic Retry Logic** with exponential backoff
- 🛡️ **Comprehensive Error Handling** with custom error types
- 📡 **HTTP Interceptors** for seamless auth integration
- 🧪 **Mock Server Support** using MSW for testing
- 📦 **TypeScript First** with full type definitions
- 🏗️ **Modular Architecture** for easy extension

## Installation

```bash
npm install @knbiosciences/api-client
```

or

```bash
pnpm add @knbiosciences/api-client
```

## Quick Start

### Basic Setup

```typescript
import { ApiClient, AuthService } from '@knbiosciences/api-client';

// Initialize auth service
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in'
});

// Initialize API client
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService
});
```

### Authentication Flow

```typescript
// Login
const tokens = await authService.login({
  username: 'user@example.com',
  password: 'password'
});

// The API client will automatically handle token refresh
// Make authenticated requests
const products = await apiClient.get('/products');
```

### User Registration

```typescript
const newUser = await authService.register({
  email: 'newuser@example.com',
  password: 'securepassword',
  firstName: 'John',
  lastName: 'Doe'
});
```

### Logout

```typescript
await authService.logout();
```

## API Usage

### GET Request

```typescript
const products = await apiClient.get('/products');
const product = await apiClient.get('/products/123');
```

### POST Request

```typescript
const newProduct = await apiClient.post('/products', {
  name: 'New Product',
  description: 'Product description',
  price: 99.99
});
```

### PUT Request

```typescript
const updatedProduct = await apiClient.put('/products/123', {
  name: 'Updated Product',
  price: 149.99
});
```

### DELETE Request

```typescript
await apiClient.delete('/products/123');
```

## Configuration

### AuthService Options

```typescript
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in',
  // Optional configurations
  tokenRefreshThreshold: 300, // seconds before expiry to refresh
  maxRetries: 3,
  retryDelay: 1000 // milliseconds
});
```

### ApiClient Options

```typescript
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService,
  // Optional configurations
  timeout: 10000, // milliseconds
  retries: 3,
  retryDelay: 1000,
  headers: {
    'X-API-Version': '1.0'
  }
});
```

## Data Models

The library includes TypeScript interfaces for common ERP entities:

```typescript
import type {
  Product,
  Batch,
  Order,
  User,
  ApiResponse
} from '@knbiosciences/api-client';

// Type-safe usage
const product: Product = {
  id: '123',
  name: 'Sample Product',
  description: 'Description',
  price: 99.99,
  category: 'Category A'
};
```

## Error Handling

```typescript
try {
  const data = await apiClient.get('/products');
} catch (error) {
  if (error instanceof AuthError) {
    // Handle authentication errors
    console.error('Authentication failed:', error.message);
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation failed:', error.details);
  } else if (error instanceof ApiError) {
    // Handle general API errors
    console.error('API Error:', error.status, error.message);
  }
}
```

## Mock Server Setup

For testing and development, you can set up a mock server using MSW:

```typescript
import { setupMockServer } from '@knbiosciences/api-client';

// Setup mock server
const server = setupMockServer();

// Start mock server
server.listen();

// Your tests here
const products = await apiClient.get('/products');

// Stop mock server
server.close();
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the KN Biosciences development team or create an issue in the repository.

---

**Homepage:** [https://www.knbiosciences.in](https://www.knbiosciences.in)
**Repository:** [https://github.com/knbiosciences/api-client](https://github.com/knbiosciences/api-client)
A robust TypeScript API client library for KN Biosciences ERP system, featuring OAuth2 authentication, automatic token refresh, request/response validation, and comprehensive error handling.

## Features

- 🔐 **OAuth2 Authentication** with automatic token refresh
- ✅ **Schema Validation** using Zod for type-safe requests and responses
- 🔄 **Automatic Retry Logic** with exponential backoff
- 🛡️ **Comprehensive Error Handling** with custom error types
- 📡 **HTTP Interceptors** for seamless auth integration
- 🧪 **Mock Server Support** using MSW for testing
- 📦 **TypeScript First** with full type definitions
- 🏗️ **Modular Architecture** for easy extension

## Installation

```bash
npm install @knbiosciences/api-client
```

or

```bash
pnpm add @knbiosciences/api-client
```

## Quick Start

### Basic Setup

```typescript
import { ApiClient, AuthService } from '@knbiosciences/api-client';

// Initialize auth service
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in'
});

// Initialize API client
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService
});
```

### Authentication Flow

```typescript
// Login
const tokens = await authService.login({
  username: 'user@example.com',
  password: 'password'
});

// The API client will automatically handle token refresh
// Make authenticated requests
const products = await apiClient.get('/products');
```

### User Registration

```typescript
const newUser = await authService.register({
  email: 'newuser@example.com',
  password: 'securepassword',
  firstName: 'John',
  lastName: 'Doe'
});
```

### Logout

```typescript
await authService.logout();
```

## API Usage

### GET Request

```typescript
const products = await apiClient.get('/products');
const product = await apiClient.get('/products/123');
```

### POST Request

```typescript
const newProduct = await apiClient.post('/products', {
  name: 'New Product',
  description: 'Product description',
  price: 99.99
});
```

### PUT Request

```typescript
const updatedProduct = await apiClient.put('/products/123', {
  name: 'Updated Product',
  price: 149.99
});
```

### DELETE Request

```typescript
await apiClient.delete('/products/123');
```

## Configuration

### AuthService Options

```typescript
const authService = new AuthService({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbiosciences.in/oauth/token',
  baseUrl: 'https://api.knbiosciences.in',
  // Optional configurations
  tokenRefreshThreshold: 300, // seconds before expiry to refresh
  maxRetries: 3,
  retryDelay: 1000 // milliseconds
});
```

### ApiClient Options

```typescript
const apiClient = new ApiClient({
  baseURL: 'https://api.knbiosciences.in',
  authService,
  // Optional configurations
  timeout: 10000, // milliseconds
  retries: 3,
  retryDelay: 1000,
  headers: {
    'X-API-Version': '1.0'
  }
});
```

## Data Models

The library includes TypeScript interfaces for common ERP entities:

```typescript
import type {
  Product,
  Batch,
  Order,
  User,
  ApiResponse
} from '@knbiosciences/api-client';

// Type-safe usage
const product: Product = {
  id: '123',
  name: 'Sample Product',
  description: 'Description',
  price: 99.99,
  category: 'Category A'
};
```

## Error Handling

```typescript
try {
  const data = await apiClient.get('/products');
} catch (error) {
  if (error instanceof AuthError) {
    // Handle authentication errors
    console.error('Authentication failed:', error.message);
  } else if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation failed:', error.details);
  } else if (error instanceof ApiError) {
    // Handle general API errors
    console.error('API Error:', error.status, error.message);
  }
}
```

## Mock Server Setup

For testing and development, you can set up a mock server using MSW:

```typescript
import { setupMockServer } from '@knbiosciences/api-client';

// Setup mock server
const server = setupMockServer();

// Start mock server
server.listen();

// Your tests here
const products = await apiClient.get('/products');

// Stop mock server
server.close();
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the KN Biosciences development team or create an issue in the repository.

---

**Homepage:** [https://www.knbiosciences.in](https://www.knbiosciences.in)
**Repository:** [https://github.com/knbiosciences/api-client](https://github.com/knbiosciences/api-client)
