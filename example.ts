/**
 * KN Biosciences API Client Library - Usage Example
 *
 * This example demonstrates the complete authentication flow and API usage
 * for the KN Biosciences ERP system.
 */

import {
  AuthService,
  Client,
  type IAuthConfig,
  type IClientConfig,
  type Product,
  type Batch,
  type Order
} from './src';

// Configuration
const authConfig: IAuthConfig = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbio.com/oauth/token',
  scope: 'read write'
};

const clientConfig: IClientConfig = {
  baseURL: 'https://api.knbio.com',
  timeout: 10000,
  retries: 3
};

// Initialize services
const authService = new AuthService(authConfig);
const client = new Client(clientConfig, authService);

// Example: User Registration
async function registerUser() {
  try {
    const registrationData = {
      email: 'user@example.com',
      password: 'securePassword123!',
      firstName: 'John',
      lastName: 'Doe',
      company: 'KN Biosciences'
    };

    const user = await authService.register(registrationData);
    console.log('User registered successfully:', user);
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Example: User Login
async function loginUser() {
  try {
    const credentials = {
      username: 'user@example.com',
      password: 'securePassword123!'
    };

    const tokenResponse = await authService.login(credentials);
    console.log('Login successful, token expires at:', new Date(tokenResponse.expiresAt));
    return tokenResponse;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Example: Make authenticated API calls
async function fetchProducts() {
  try {
    const products = await client.get<Product[]>('/products');
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

async function createBatch(batchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const newBatch = await client.post<Batch>('/batches', batchData);
    console.log('Created batch:', newBatch);
    return newBatch;
  } catch (error) {
    console.error('Failed to create batch:', error);
    throw error;
  }
}

async function updateOrder(orderId: string, updates: Partial<Order>) {
  try {
    const updatedOrder = await client.put<Order>(`/orders/${orderId}`, updates);
    console.log('Updated order:', updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
}

async function deleteProduct(productId: string) {
  try {
    await client.delete(`/products/${productId}`);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

// Example: Logout
async function logoutUser() {
  try {
    await authService.logout();
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

// Complete workflow example
async function main() {
  try {
    // Register a new user (skip if user already exists)
    // await registerUser();

    // Login
    await loginUser();

    // Make authenticated API calls
    const products = await fetchProducts();

    if (products.length > 0) {
      // Example batch data
      const batchData = {
        productId: products[0].id,
        quantity: 100,
        unit: 'kg',
        location: 'Warehouse A',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        quality: 'A'
      };

      const newBatch = await createBatch(batchData);

      // Update an order (assuming an order exists)
      // await updateOrder('order-id-here', { status: 'completed' });

      // Delete a product (be careful with this!)
      // await deleteProduct(products[0].id);
    }

    // Logout
    await logoutUser();

  } catch (error) {
    console.error('Workflow failed:', error);
  }
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

export { main };
 * KN Biosciences API Client Library - Usage Example
 *
 * This example demonstrates the complete authentication flow and API usage
 * for the KN Biosciences ERP system.
 */

import {
  AuthService,
  Client,
  type IAuthConfig,
  type IClientConfig,
  type Product,
  type Batch,
  type Order
} from './src';

// Configuration
const authConfig: IAuthConfig = {
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  tokenUrl: 'https://api.knbio.com/oauth/token',
  scope: 'read write'
};

const clientConfig: IClientConfig = {
  baseURL: 'https://api.knbio.com',
  timeout: 10000,
  retries: 3
};

// Initialize services
const authService = new AuthService(authConfig);
const client = new Client(clientConfig, authService);

// Example: User Registration
async function registerUser() {
  try {
    const registrationData = {
      email: 'user@example.com',
      password: 'securePassword123!',
      firstName: 'John',
      lastName: 'Doe',
      company: 'KN Biosciences'
    };

    const user = await authService.register(registrationData);
    console.log('User registered successfully:', user);
    return user;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}

// Example: User Login
async function loginUser() {
  try {
    const credentials = {
      username: 'user@example.com',
      password: 'securePassword123!'
    };

    const tokenResponse = await authService.login(credentials);
    console.log('Login successful, token expires at:', new Date(tokenResponse.expiresAt));
    return tokenResponse;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Example: Make authenticated API calls
async function fetchProducts() {
  try {
    const products = await client.get<Product[]>('/products');
    console.log('Fetched products:', products);
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

async function createBatch(batchData: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const newBatch = await client.post<Batch>('/batches', batchData);
    console.log('Created batch:', newBatch);
    return newBatch;
  } catch (error) {
    console.error('Failed to create batch:', error);
    throw error;
  }
}

async function updateOrder(orderId: string, updates: Partial<Order>) {
  try {
    const updatedOrder = await client.put<Order>(`/orders/${orderId}`, updates);
    console.log('Updated order:', updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
}

async function deleteProduct(productId: string) {
  try {
    await client.delete(`/products/${productId}`);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

// Example: Logout
async function logoutUser() {
  try {
    await authService.logout();
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
}

// Complete workflow example
async function main() {
  try {
    // Register a new user (skip if user already exists)
    // await registerUser();

    // Login
    await loginUser();

    // Make authenticated API calls
    const products = await fetchProducts();

    if (products.length > 0) {
      // Example batch data
      const batchData = {
        productId: products[0].id,
        quantity: 100,
        unit: 'kg',
        location: 'Warehouse A',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        quality: 'A'
      };

      const newBatch = await createBatch(batchData);

      // Update an order (assuming an order exists)
      // await updateOrder('order-id-here', { status: 'completed' });

      // Delete a product (be careful with this!)
      // await deleteProduct(products[0].id);
    }

    // Logout
    await logoutUser();

  } catch (error) {
    console.error('Workflow failed:', error);
  }
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

export { main };
// Example: Authenticate and fetch data
async function exampleUsage() {
  try {
    // Login with username and password
    await authService.login('your_username', 'your_password');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();

import { Client, AuthService, IProduct, IBatch, IOrder } from './src';

// Configuration for the API client
const clientConfig = {
  baseURL: 'https://api.knbiosciences.com/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
};

// Configuration for authentication
const authConfig = {
  loginUrl: 'https://api.knbiosciences.com/auth/login',
  tokenUrl: 'https://api.knbiosciences.com/auth/refresh',
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
};

// Initialize the API client
const apiClient = new Client(clientConfig);

// Initialize the authentication service
const authService = new AuthService(authConfig);

// Attach the authentication interceptor to the client
authService.setupInterceptor(apiClient);

// Example: Complete authentication flow and API usage
async function exampleUsage() {
  try {
    // Register a new user
    const registrationResult = await authService.register({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'securepassword123',
    });
    console.log('Registration successful:', registrationResult);

    // Login with username and password
    await authService.login('newuser', 'securepassword123');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

    // Logout
    authService.logout();
    console.log('Logged out successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();
import { Client, AuthService, IProduct, IBatch, IOrder } from './src';

// Configuration for the API client
const clientConfig = {
  baseURL: 'https://api.knbiosciences.com/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
};

// Configuration for authentication
const authConfig = {
  registerUrl: 'https://api.knbiosciences.com/auth/register',
  loginUrl: 'https://api.knbiosciences.com/auth/login',
  tokenUrl: 'https://api.knbiosciences.com/auth/refresh',
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
};

// Initialize the API client
const apiClient = new Client(clientConfig);

// Initialize the authentication service
const authService = new AuthService(authConfig);

// Attach the authentication interceptor to the client
authService.setupInterceptor(apiClient);

// Example: Authenticate and fetch data
async function exampleUsage() {
  try {
    // Login with username and password
    await authService.login('your_username', 'your_password');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();


import { Client, AuthService, IProduct, IBatch, IOrder } from './src';

// Configuration for the API client
const clientConfig = {
  baseURL: 'https://api.knbiosciences.com/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
};

// Configuration for authentication
const authConfig = {
  loginUrl: 'https://api.knbiosciences.com/auth/login',
  tokenUrl: 'https://api.knbiosciences.com/auth/refresh',
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
};

// Initialize the API client
const apiClient = new Client(clientConfig);

// Initialize the authentication service
const authService = new AuthService(authConfig);

// Attach the authentication interceptor to the client
authService.setupInterceptor(apiClient);

// Example: Authenticate and fetch data
async function exampleUsage() {
  try {
    // Login with username and password
    await authService.login('your_username', 'your_password');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();
import { Client, AuthService, IProduct, IBatch, IOrder } from './src';

// Configuration for the API client
const clientConfig = {
  baseURL: 'https://api.knbiosciences.com/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
};

// Configuration for authentication
const authConfig = {
  registerUrl: 'https://api.knbiosciences.com/auth/register',
  loginUrl: 'https://api.knbiosciences.com/auth/login',
  tokenUrl: 'https://api.knbiosciences.com/auth/refresh',
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
};

// Initialize the API client
const apiClient = new Client(clientConfig);

// Initialize the authentication service
const authService = new AuthService(authConfig);

// Attach the authentication interceptor to the client
authService.setupInterceptor(apiClient);

// Example: Authenticate and fetch data
async function exampleUsage() {
  try {
    // Login with username and password
    await authService.login('your_username', 'your_password');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();

import { Client, AuthService, IProduct, IBatch, IOrder } from './src';

// Configuration for the API client
const clientConfig = {
  baseURL: 'https://api.knbiosciences.com/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
};

// Configuration for authentication
const authConfig = {
  loginUrl: 'https://api.knbiosciences.com/auth/login',
  tokenUrl: 'https://api.knbiosciences.com/auth/refresh',
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
};

// Initialize the API client
const apiClient = new Client(clientConfig);

// Initialize the authentication service
const authService = new AuthService(authConfig);

// Attach the authentication interceptor to the client
authService.setupInterceptor(apiClient);

// Example: Complete authentication flow and API usage
async function exampleUsage() {
  try {
    // Register a new user
    const registrationResult = await authService.register({
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'securepassword123',
    });
    console.log('Registration successful:', registrationResult);

    // Login with username and password
    await authService.login('newuser', 'securepassword123');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

    // Logout
    authService.logout();
    console.log('Logged out successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();
import { Client, AuthService, IProduct, IBatch, IOrder } from './src';

// Configuration for the API client
const clientConfig = {
  baseURL: 'https://api.knbiosciences.com/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
};

// Configuration for authentication
const authConfig = {
  registerUrl: 'https://api.knbiosciences.com/auth/register',
  loginUrl: 'https://api.knbiosciences.com/auth/login',
  tokenUrl: 'https://api.knbiosciences.com/auth/refresh',
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
};

// Initialize the API client
const apiClient = new Client(clientConfig);

// Initialize the authentication service
const authService = new AuthService(authConfig);

// Attach the authentication interceptor to the client
authService.setupInterceptor(apiClient);

// Example: Authenticate and fetch data
async function exampleUsage() {
  try {
    // Login with username and password
    await authService.login('your_username', 'your_password');
    console.log('Authentication successful!');

    // Fetch products
    const products: IProduct[] = await apiClient.get('/products');
    console.log('Products:', products);

    // Fetch a specific order
    const order: IOrder = await apiClient.get('/orders/123');
    console.log('Order:', order);

    // Create a new batch
    const newBatch: IBatch = {
      product_id: 'prod_123',
      quantity: 100,
    };
    const createdBatch: IBatch = await apiClient.post('/batches', { body: newBatch });
    console.log('Created batch:', createdBatch);

    // Update an order
    const updatedOrder: Partial<IOrder> = { status: 'paid' };
    const result: IOrder = await apiClient.put('/orders/123', { body: updatedOrder });
    console.log('Updated order:', result);

    // Delete a batch
    await apiClient.delete('/batches/456');
    console.log('Batch deleted successfully');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
exampleUsage();


