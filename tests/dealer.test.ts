import { Client } from '../src/api/client';
import { DealerService } from '../src/api/dealer';
import { ICommissionTier } from '../src/models';

describe('DealerService', () => {
    let dealerService: DealerService;
    let mockClient: any;

    beforeEach(() => {
        mockClient = {
            get: jest.fn(),
            post: jest.fn()
        };
        dealerService = new DealerService(mockClient as Client, {
            networkEndpoint: '/network',
            subDealerEndpoint: '/sub-dealers',
            dealerOrdersEndpoint: '/dealer-orders'
        });
    });

    const mockTiers: ICommissionTier[] = [
        {
            productCategory: 'agri',
            commissionPercentage: 5,
            minVolume: 0,
            maxVolume: 1000
        },
        {
            productCategory: 'agri',
            commissionPercentage: 8,
            minVolume: 1001,
            maxVolume: 5000
        },
        {
            productCategory: 'aqua',
            commissionPercentage: 10,
            minVolume: 0
        }
    ];

    describe('calculateCommission', () => {
        test('should calculate correct commission for base agri tier', () => {
            const amount = 10000; // INR
            const commission = dealerService.calculateCommission(amount, 'agri', 500, mockTiers);
            expect(commission).toBe(500); // 5% of 10000
        });

        test('should calculate correct commission for higher agri tier', () => {
            const amount = 10000;
            const commission = dealerService.calculateCommission(amount, 'agri', 2000, mockTiers);
            expect(commission).toBe(800); // 8% of 10000
        });

        test('should calculate correct commission for aqua (no max volume)', () => {
            const amount = 20000;
            const commission = dealerService.calculateCommission(amount, 'aqua', 10000, mockTiers);
            expect(commission).toBe(2000); // 10% of 20000
        });

        test('should return 0 if no tier matches category', () => {
            const commission = dealerService.calculateCommission(1000, 'unknown', 100, mockTiers);
            expect(commission).toBe(0);
        });
    });

    describe('API Methods', () => {
        test('fetchNetwork should call correct endpoint', async () => {
            mockClient.get.mockResolvedValue({ territory: 'North', subDealers: [] });
            const network = await dealerService.fetchNetwork('d1');
            expect(mockClient.get).toHaveBeenCalledWith('/network/d1');
            expect(network.territory).toBe('North');
        });

        test('placeBulkOrder should set correct order type', async () => {
            const orderData: any = { items: [], customer_id: 'd1' };
            await dealerService.placeBulkOrder(orderData);
            expect(mockClient.post).toHaveBeenCalledWith('/dealer-orders/bulk', expect.objectContaining({
                body: expect.objectContaining({ orderType: 'b2b_bulk' })
            }));
        });
    });
});
