import { Client } from '../src/api/client';
import { AuthService } from '../src/api/auth';

// Mocking global fetch to control network behavior
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('AuthService & Client Integration', () => {
    let authConfig: any;
    let apiClient: Client;
    let authService: AuthService;

    beforeEach(() => {
        // Reset mocks before each test
        mockFetch.mockClear();

        // Configuration for Auth Service
        authConfig = {
            loginUrl: 'https://api.test.com/auth/login',
            tokenUrl: 'https://api.test.com/auth/token',
            client_id: 'test_client',
            client_secret: 'test_secret'
        };

        // Initialize instances
        authService = new AuthService(authConfig);
        apiClient = new Client({
            baseURL: 'https://api.test.com/v1',
            headers: { 'Content-Type': 'application/json' }
        });

        // Attach the interceptor to the client
        authService.setupInterceptor(apiClient);
    });

    test('AuthService.login should store token on successful response', async () => {
        // 1. Mock successful login response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: async () => ({
                access_token: 'access_123',
                refresh_token: 'refresh_123',
                expires_in: 3600,
                token_type: 'Bearer'
            })
        });

        // 2. Call login
        await authService.login('user', 'pass');

        // 3. Verify fetch was called with correct payload
        expect(mockFetch).toHaveBeenCalledWith(
            expect.stringContaining(authConfig.loginUrl),
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({
                    grant_type: 'password',
                    client_id: 'test_client',
                    client_secret: 'test_secret',
                    username: 'user',
                    password: 'pass'
                })
            })
        );

        // 4. Verify token is accessible via private method hack (or verify behavior via next test)
        // Since _getAccessToken is private, we test via interceptor in next test
    });

    test('Client should automatically inject Authorization header', async () => {
        // 1. Setup: Login first to set token
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                access_token: 'test_token',
                refresh_token: 'test_refresh',
                expires_in: 3600,
                token_type: 'Bearer'
            })
        });
        await authService.login('user', 'pass');

        // 2. Mock a generic API GET request
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json: async () => ({ data: 'response' })
        });

        // 3. Call client.get
        await apiClient.get('/data');

        // 4. Verify Authorization header was present
        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String), // URL
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({
                    'Authorization': 'Bearer test_token'
                })
            })
        );
    });

    test('Interceptor should call refresh on 401 Unauthorized', async () => {
        // 1. Setup: Login with an "expired" timestamp (simulated by forcing 401)
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                access_token: 'old_token',
                refresh_token: 'old_refresh',
                expires_in: 0, // Instant expiry
                token_type: 'Bearer'
            })
        });
        await authService.login('user', 'pass');

        // 2. Mock chain: First request fails (401), Second is Token Refresh, Third is Retry
        mockFetch
            // Call 1: API Request -> Fails
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
                statusText: 'Unauthorized',
                json: async () => ({ error: 'Token expired' }),
                text: async () => JSON.stringify({ error: 'Token expired' })
            })
            // Call 2: Refresh Token -> Succeeds
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    access_token: 'new_token',
                    refresh_token: 'new_refresh',
                    expires_in: 3600,
                    token_type: 'Bearer'
                })
            })
            // Call 3: API Request Retry -> Succeeds
            .mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => ({ data: 'success' })
            });

        // 3. Execute
        await apiClient.get('/protected-data');

        // 4. Verify calls
        expect(mockFetch).toHaveBeenCalledTimes(4);

        // Check if refresh endpoint was called (Call 3)
        expect(mockFetch).toHaveBeenNthCalledWith(3,
            expect.stringContaining(authConfig.tokenUrl),
            expect.any(Object)
        );

        // Check if final retry used new token (Call 4)
        const lastCallConfig = mockFetch.mock.calls[3][1]; // 4th call, 2nd arg (options)
        expect(lastCallConfig.headers['Authorization']).toBe('Bearer new_token');
    });

    test('Refresh should throw error if network fails permanently', async () => {
        // 1. Force a refresh scenario
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: 'bad', refresh_token: 'bad', expires_in: 0, token_type: 'Bearer' })
        });
        await authService.login('user', 'pass');

        // 2. Mock Network Failure for refresh
        mockFetch.mockRejectedValue(new Error('Network Error'));

        // 3. Execute and expect error
        await expect(apiClient.get('/data')).rejects.toThrow('Network Error');
    });
});