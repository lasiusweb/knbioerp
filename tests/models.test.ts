import { ReviewSchema, ProductSchema, OrderSchema, IntegratedProductSchema, UserProfileSchema } from '../src/schemas/models';

describe('Zod Schema Validation', () => {
    test('ReviewSchema should validate correct data', () => {
        const validData = {
            user_id: 'u123',
            rating: 4,
            comment: 'Good product',
            date: '2023-10-27T10:00:00Z'
        };
        expect(() => ReviewSchema.parse(validData)).not.toThrow();
    });

    test('ReviewSchema should throw on invalid rating', () => {
        const invalidData = {
            user_id: 'u123',
            rating: 6, // Max is 5
            comment: 'Too high',
            date: '2023-10-27T10:00:00Z'
        };
        expect(() => ReviewSchema.parse(invalidData)).toThrow();
    });

    test('ProductSchema should validate correct data', () => {
        const validData = {
            id: 'p123',
            name: 'Organic Fertilizer',
            base_price: 50.0,
            expiry_date: '2025-12-31',
            weight: 10,
            packing: 'Bag',
            form: 'Granular',
            reviews: [],
            recommendations: ['p456']
        };
        expect(() => ProductSchema.parse(validData)).not.toThrow();
    });

    test('IntegratedProductSchema should validate extended fields', () => {
        const validData = {
            id: 'ip123',
            name: 'Aqua Feed Pro',
            base_price: 150.0,
            expiry_date: '2026-06-30',
            weight: 25,
            packing: 'Bulk Bag',
            form: 'Pellets',
            reviews: [],
            recommendations: [],
            category: 'aqua',
            applications: ['fish'],
            compatibleWith: ['aerator-1'],
            seasonalAvailability: [
                { season: 'summer', startMonth: 3, endMonth: 6, demandMultiplier: 1.2 }
            ],
            regionalPricing: [
                { region: 'South', adjustment: 1.05, transportCost: 10 }
            ],
            minOrderQty: 5,
            bulkPricing: [
                { minQuantity: 10, discountPercentage: 10 }
            ],
            targetAudience: 'dealer'
        };
        expect(() => IntegratedProductSchema.parse(validData)).not.toThrow();
    });

    test('UserProfileSchema should validate complex objects', () => {
        const validData = {
            id: 'u123',
            role: 'farmer',
            location: {
                address: '123 Farm Road',
                city: 'AgriTown',
                state: 'GreenState',
                country: 'India',
                postalCode: '560001',
                timezone: 'Asia/Kolkata'
            },
            loyaltyPoints: 100,
            preferredProducts: ['p1'],
            complianceStatus: 'approved',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-01T00:00:00Z'
        };
        expect(() => UserProfileSchema.parse(validData)).not.toThrow();
    });
});
