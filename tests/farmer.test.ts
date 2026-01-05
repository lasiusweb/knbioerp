import { Client } from '../src/api/client';
import { FarmerService } from '../src/api/farmer';

describe('FarmerService', () => {
    let farmerService: FarmerService;
    let mockClient: any;

    beforeEach(() => {
        mockClient = {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn()
        };
        farmerService = new FarmerService(mockClient as Client, {
            profileEndpoint: '/profile',
            recommendationsEndpoint: '/recommendations',
            analyticsEndpoint: '/analytics'
        });
    });

    test('fetchProfile should call correct endpoint', async () => {
        const mockProfile = { id: 'f1', name: 'My Farm' };
        mockClient.get.mockResolvedValue(mockProfile);
        const profile = await farmerService.fetchProfile('farmer123');
        expect(mockClient.get).toHaveBeenCalledWith('/profile/farmer123');
        expect(profile.name).toBe('My Farm');
    });

    test('getRecommendations should pass farmerId in params', async () => {
        await farmerService.getRecommendations('farmer123');
        expect(mockClient.get).toHaveBeenCalledWith('/recommendations', expect.objectContaining({
            params: { farmerId: 'farmer123' }
        }));
    });

    test('updateProfile should use PUT method', async () => {
        const updateData = { name: 'New Farm Name' };
        await farmerService.updateProfile('f123', updateData);
        expect(mockClient.put).toHaveBeenCalledWith('/profile/f123', expect.objectContaining({
            body: updateData
        }));
    });
});
