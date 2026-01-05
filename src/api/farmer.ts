import { Client } from './client';
import {
    IFarmProfile,
    IProductRecommendation,
    IUsageAnalytics
} from '../models';

/**
 * Configuration for the Farmer Service.
 */
export interface IFarmerConfig {
    /** Endpoint for farm profile management. */
    profileEndpoint: string;
    /** Endpoint for product recommendations. */
    recommendationsEndpoint: string;
    /** Endpoint for usage analytics. */
    analyticsEndpoint: string;
}

/**
 * B2C Farmer Service.
 * Provides features for farm management, recommendations, and personal analytics.
 */
export class FarmerService {
    constructor(
        private _client: Client,
        private _config: IFarmerConfig
    ) { }

    /**
     * Fetches the complete farm profile for a farmer.
     * 
     * @param farmerId - Unique identifier for the farmer.
     * @returns Promise<IFarmProfile>
     */
    public async fetchProfile(farmerId: string): Promise<IFarmProfile> {
        return this._client.get<IFarmProfile>(`${this._config.profileEndpoint}/${farmerId}`);
    }

    /**
     * Updates farm profile details (e.g., adding a new pond or crop).
     * 
     * @param farmerId - Unique identifier for the farmer.
     * @param profileData - Partial farm profile data.
     */
    public async updateProfile(farmerId: string, profileData: Partial<IFarmProfile>): Promise<IFarmProfile> {
        return this._client.put<IFarmProfile>(`${this._config.profileEndpoint}/${farmerId}`, {
            body: profileData
        });
    }

    /**
     * Retrieves AI-driven product recommendations for the farmer.
     * 
     * @param farmerId - Unique identifier for the farmer.
     * @returns Promise<IProductRecommendation[]>
     */
    public async getRecommendations(farmerId: string): Promise<IProductRecommendation[]> {
        return this._client.get<IProductRecommendation[]>(this._config.recommendationsEndpoint, {
            params: { farmerId }
        });
    }

    /**
     * Fetches usage analytics for products used on the farm.
     * 
     * @param farmerId - Unique identifier for the farmer.
     * @param period - 'monthly' | 'quarterly' | 'annual'
     */
    public async getUsageAnalytics(farmerId: string, period: string): Promise<IUsageAnalytics[]> {
        return this._client.get<IUsageAnalytics[]>(this._config.analyticsEndpoint, {
            params: { farmerId, period }
        });
    }

    /**
     * Submits water quality or soil test data for analysis.
     * 
     * @param farmId - The farm ID.
     * @param resourceId - POND ID or CROP ID.
     * @param testData - The measured metrics.
     */
    public async submitTestData(farmId: string, resourceId: string, testData: any): Promise<void> {
        await this._client.post(`${this._config.profileEndpoint}/${farmId}/resources/${resourceId}/tests`, {
            body: testData
        });
    }

    /**
     * Local engine to provide immediate feedback/advice based on water quality parameters.
     * 
     * @param metrics - Current water quality metrics (pH, DO, etc.)
     * @returns string[] - List of action-oriented advice strings.
     */
    public getWaterQualityAdvice(metrics: { ph: number; dissolvedOxygen: number; ammonia: number }): string[] {
        const advice: string[] = [];

        if (metrics.ph < 6.5) advice.push('pH is critically low. Add lime to increase alkalinity.');
        if (metrics.ph > 8.5) advice.push('pH is high. Check for algae blooms and monitor ammonia toxicity.');

        if (metrics.dissolvedOxygen < 4.0) advice.push('Dissolved Oxygen is low. Increase aeration immediately.');

        if (metrics.ammonia > 0.1) advice.push('Ammonia levels are rising. Reduce feeding and check for organic buildup.');

        if (advice.length === 0) advice.push('Water quality parameters are within optimal range.');

        return advice;
    }
}
