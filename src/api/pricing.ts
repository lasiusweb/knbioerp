import { Client } from './client';
import {
    IPricingRule,
    IPricingCalculation,
    IPricingAdjustmentResult,
    IUserProfile,
    IIntegratedProduct,
    IPricingCondition,
    IPricingAdjustment
} from '../models';

/**
 * Configuration for the Pricing Service.
 */
export interface IPricingConfig {
    /** Endpoint to fetch pricing rules. */
    rulesEndpoint: string;
    /** Endpoint to calculate price on the server. */
    calculateEndpoint: string;
}

/**
 * Smart Pricing Engine Service.
 * Handles both remote API-based calculations and local rule-based calculations.
 */
export class PricingService {
    constructor(
        private _client: Client,
        private _config: IPricingConfig
    ) { }

    /**
     * Fetches all active pricing rules from the server.
     * 
     * @returns Promise<IPricingRule[]> - List of pricing rules.
     */
    public async fetchRules(): Promise<IPricingRule[]> {
        return this._client.get<IPricingRule[]>(this._config.rulesEndpoint);
    }

    /**
     * Calculates the price for a product and user based on server-side logic.
     * 
     * @param productId - ID of the product.
     * @param userId - ID of the user.
     * @param quantity - Desired quantity.
     * @returns Promise<IPricingCalculation> - The price calculation result.
     */
    public async calculateRemote(productId: string, userId: string, quantity: number): Promise<IPricingCalculation> {
        return this._client.post<IPricingCalculation>(this._config.calculateEndpoint, {
            body: { productId, userId, quantity }
        });
    }

    /**
     * Local Smart Pricing Engine.
     * Evaluates IPricingRule logic on the client-side for immediate feedback.
     * 
     * @param product - The integrated product model.
     * @param user - The user profile model.
     * @param quantity - Requested quantity.
     * @param rules - List of pricing rules to apply.
     * @returns IPricingCalculation - The final price breakdown.
     */
    public calculateLocal(
        product: IIntegratedProduct,
        user: IUserProfile,
        quantity: number,
        rules: IPricingRule[]
    ): IPricingCalculation {
        let currentPrice = product.base_price;
        const adjustments: IPricingAdjustmentResult[] = [];
        const appliedRules: string[] = [];

        // 1. Filter active rules and check temporal validity
        const validRules = rules.filter(r => r.active && this._isRuleValid(r));

        // 2. Sort rules by priority (highest number = higher priority)
        const sortedRules = [...validRules].sort((a, b) => b.priority - a.priority);

        // 3. Process each rule
        for (const rule of sortedRules) {
            // Context for condition evaluation
            const context = { user, product, quantity, now: new Date() };

            if (this._evaluateConditions(rule.conditions, context)) {
                for (const adj of rule.adjustments) {
                    const { newPrice, diff } = this._applyAdjustment(currentPrice, adj);

                    // Update current price for subsequent rules
                    currentPrice = newPrice;

                    adjustments.push({
                        ruleId: rule.id,
                        ruleName: rule.name,
                        adjustment: diff,
                        description: adj.description
                    });
                }
                appliedRules.push(rule.id);
            }
        }

        return {
            productId: product.id,
            userId: user.id,
            quantity: quantity,
            basePrice: product.base_price,
            adjustments: adjustments,
            finalPrice: Number(currentPrice.toFixed(2)),
            appliedRules: appliedRules,
            calculatedAt: new Date().toISOString()
        };
    }

    /**
     * Checks if a rule is within its valid date range.
     */
    private _isRuleValid(rule: IPricingRule): boolean {
        const now = new Date();
        const from = rule.validFrom ? new Date(rule.validFrom) : null;
        const to = rule.validTo ? new Date(rule.validTo) : null;

        if (from && now < from) return false;
        if (to && now > to) return false;
        return true;
    }

    /**
     * Evaluates a set of conditions against a context object.
     * Uses dot-notation for field access (e.g., 'user.role').
     */
    private _evaluateConditions(conditions: IPricingCondition[], context: any): boolean {
        if (!conditions || conditions.length === 0) return true;

        // By default, conditions use AND logic
        return conditions.every(condition => {
            const value = this._getValueByPath(context, condition.field);

            switch (condition.operator) {
                case 'equals':
                    return value === condition.value;
                case 'greater_than':
                    return value > condition.value;
                case 'less_than':
                    return value < condition.value;
                case 'in':
                    return Array.isArray(condition.value) && condition.value.includes(value);
                case 'between':
                    return Array.isArray(condition.value) && Array.isArray(value) === false &&
                        value >= condition.value[0] && value <= condition.value[1];
                default:
                    console.warn(`[PricingEngine] Unknown operator: ${condition.operator}`);
                    return false;
            }
        });
    }

    /**
     * Helper to retrieve nested values from an object using a string path.
     */
    private _getValueByPath(obj: any, path: string): any {
        return path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, obj);
    }

    /**
     * Applies a single adjustment to the current price.
     */
    private _applyAdjustment(price: number, adjustment: IPricingAdjustment): { newPrice: number; diff: number } {
        let diff = 0;
        let newPrice = price;

        switch (adjustment.type) {
            case 'percentage':
                // Positive value = increase, Negative value = discount
                diff = price * (adjustment.value / 100);
                newPrice = price + diff;
                break;
            case 'fixed_amount':
                diff = adjustment.value;
                newPrice = price + diff;
                break;
            case 'multiplier':
                newPrice = price * adjustment.value;
                diff = newPrice - price;
                break;
        }

        return { newPrice, diff: Number(diff.toFixed(2)) };
    }
}
