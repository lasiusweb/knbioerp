import { Client } from './client';

/**
 * Pricing Analytics Results interface.
 */
export interface IPricingTrend {
    productId: string;
    period: string;
    averagePrice: number;
    minPrice: number;
    maxPrice: number;
    volatility: number;
}

/**
 * Service for advanced pricing analytics and algorithms.
 */
export class PricingAnalyticsService {
    constructor(private _client: Client) { }

    /**
     * Calculates the profit margin percentage for a give sale.
     * 
     * @param costPrice - The absolute cost to the manufacturer (INR).
     * @param sellingPrice - The final price after all adjustments (INR).
     * @returns number - Profit margin as a percentage.
     */
    public calculateMargin(costPrice: number, sellingPrice: number): number {
        if (costPrice <= 0) return 0;
        return ((sellingPrice - costPrice) / sellingPrice) * 100;
    }

    /**
     * Fetches historical pricing trends for a product.
     * 
     * @param productId - The product ID.
     * @param months - Number of months of history to look back.
     */
    public async getPriceTrends(productId: string, months: number = 6): Promise<IPricingTrend> {
        return this._client.get<IPricingTrend>(`/analytics/pricing/trends/${productId}`, {
            params: { months }
        });
    }

    /**
     * Predicts demand elasticity based on price changes.
     * (Algorithm simulation for Phase 5)
     * 
     * @param priceChangePercent - % change in price (-10 for 10% discount).
     * @param currentDemand - Current units sold per period.
     * @param elasticityCoefficient - How sensitive demand is (default 1.5).
     * @returns number - Predicted new demand.
     */
    public predictDemand(
        priceChangePercent: number,
        currentDemand: number,
        elasticityCoefficient: number = 1.5
    ): number {
        // Simple elasticity formula: % change in Q = Elasticity * % change in P
        const demandChangePercent = -elasticityCoefficient * priceChangePercent;
        const result = currentDemand * (1 + (demandChangePercent / 100));
        return Number(result.toFixed(2));
    }
}
