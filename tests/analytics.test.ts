import { PricingAnalyticsService } from '../src/api/analytics';

describe('PricingAnalyticsService', () => {
    let analyticsService: PricingAnalyticsService;
    let mockClient: any;

    beforeEach(() => {
        mockClient = {
            get: jest.fn()
        };
        analyticsService = new PricingAnalyticsService(mockClient);
    });

    test('calculateMargin should calculate correct profit percentage', () => {
        // Cost 80, Sale 100 -> Profit 20 on 100 -> 20%
        expect(analyticsService.calculateMargin(80, 100)).toBe(20);

        // Cost 50, Sale 200 -> Profit 150 on 200 -> 75%
        expect(analyticsService.calculateMargin(50, 200)).toBe(75);
    });

    test('predictDemand should return correct units based on elasticity', () => {
        // 10% discount (-10% price change)
        // Elasticity 1.5 -> 15% demand increase
        // Current demand 100 -> Predicted 115
        expect(analyticsService.predictDemand(-10, 100, 1.5)).toBe(115);

        // 20% price hike (+20%)
        // Elasticity 2.0 -> 40% demand decrease
        // Current demand 100 -> Predicted 60
        expect(analyticsService.predictDemand(20, 100, 2.0)).toBe(60);
    });
});
