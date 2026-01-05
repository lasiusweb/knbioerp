import { Client } from '../src/api/client';
import { PricingService } from '../src/api/pricing';
import { IPricingRule } from '../src/models';

describe('PricingEngine (Local)', () => {
    let pricingService: PricingService;
    let mockClient: any;

    beforeEach(() => {
        mockClient = {}; // Not needed for local calculation
        pricingService = new PricingService(mockClient as Client, {
            rulesEndpoint: '/rules',
            calculateEndpoint: '/calculate'
        });
    });

    const mockProduct: any = {
        id: 'p1',
        name: 'Aqua Feed',
        base_price: 100
    };

    const mockUser: any = {
        id: 'u1',
        role: 'farmer',
        location: { region: 'South' }
    };

    test('should apply a simple percentage discount rule', () => {
        const rules: IPricingRule[] = [{
            id: 'r1',
            name: 'Farmer Discount',
            type: 'user_type',
            priority: 1,
            active: true,
            validFrom: '2020-01-01',
            conditions: [{
                field: 'user.role',
                operator: 'equals',
                value: 'farmer'
            }],
            adjustments: [{
                type: 'percentage',
                value: -10,
                description: '10% off for farmers'
            }]
        }];

        const result = pricingService.calculateLocal(mockProduct, mockUser, 1, rules);
        expect(result.finalPrice).toBe(90);
        expect(result.appliedRules).toContain('r1');
    });

    test('should apply multiple rules based on priority', () => {
        const rules: IPricingRule[] = [
            {
                id: 'r2', // Lower priority surcharge
                name: 'Regional Tax',
                type: 'geographic',
                priority: 5,
                active: true,
                validFrom: '2020-01-01',
                conditions: [{
                    field: 'user.location.region',
                    operator: 'equals',
                    value: 'South'
                }],
                adjustments: [{
                    type: 'fixed_amount',
                    value: 5,
                    description: 'South region surcharge'
                }]
            },
            {
                id: 'r1', // Higher priority discount
                name: 'Volume Discount',
                type: 'volume',
                priority: 10,
                active: true,
                validFrom: '2020-01-01',
                conditions: [{
                    field: 'quantity',
                    operator: 'greater_than',
                    value: 100
                }],
                adjustments: [{
                    type: 'percentage',
                    value: -20,
                    description: '20% off for bulk'
                }]
            }
        ];

        // Quantity 150 triggers bulk discount (r1, priority 10) then surcharge (r2, priority 5)
        // 100 -> (r1) 80 -> (r2) 85
        const result = pricingService.calculateLocal(mockProduct, mockUser, 150, rules);
        expect(result.finalPrice).toBe(85);
        expect(result.appliedRules).toEqual(['r1', 'r2']);
    });

    test('should handle "between" operator correctly', () => {
        const rules: IPricingRule[] = [{
            id: 'r1',
            name: 'Mid-range Volume',
            type: 'volume',
            priority: 1,
            active: true,
            validFrom: '2020-01-01',
            conditions: [{
                field: 'quantity',
                operator: 'between',
                value: [10, 50]
            }],
            adjustments: [{
                type: 'percentage',
                value: -5,
                description: '5% off'
            }]
        }];

        expect(pricingService.calculateLocal(mockProduct, mockUser, 5, rules).finalPrice).toBe(100);
        expect(pricingService.calculateLocal(mockProduct, mockUser, 25, rules).finalPrice).toBe(95);
        expect(pricingService.calculateLocal(mockProduct, mockUser, 55, rules).finalPrice).toBe(100);
    });

    test('should respect temporal validity', () => {
        const rules: IPricingRule[] = [{
            id: 'r1',
            name: 'Expired Promotion',
            type: 'promotional',
            priority: 1,
            active: true,
            validFrom: '2020-01-01',
            validTo: '2021-01-01',
            conditions: [],
            adjustments: [{
                type: 'percentage',
                value: -50,
                description: 'Big Sale'
            }]
        }];

        const result = pricingService.calculateLocal(mockProduct, mockUser, 1, rules);
        expect(result.finalPrice).toBe(100);
        expect(result.appliedRules).toHaveLength(0);
    });

    test('should handle "in" operator correctly', () => {
        const rules: IPricingRule[] = [{
            id: 'r1',
            name: 'Special Roles',
            type: 'user_type',
            priority: 1,
            active: true,
            validFrom: '2020-01-01',
            conditions: [{
                field: 'user.role',
                operator: 'in',
                value: ['dealer', 'distributor']
            }],
            adjustments: [{
                type: 'multiplier',
                value: 0.8,
                description: '20% off for partners'
            }]
        }];

        const dealerUser = { ...mockUser, role: 'dealer' };
        const farmerUser = { ...mockUser, role: 'farmer' };

        expect(pricingService.calculateLocal(mockProduct, dealerUser, 1, rules).finalPrice).toBe(80);
        expect(pricingService.calculateLocal(mockProduct, farmerUser, 1, rules).finalPrice).toBe(100);
    });
});
