import { Client } from './client';
import {
    IDealerNetwork,
    ICommissionTier,
    IEnhancedOrder,
    IOrder
} from '../models';

/**
 * Configuration for the Dealer Service.
 */
export interface IDealerConfig {
    /** Endpoint to fetch dealer network details. */
    networkEndpoint: string;
    /** Endpoint to manage sub-dealers. */
    subDealerEndpoint: string;
    /** Endpoint for dealer-specific orders. */
    dealerOrdersEndpoint: string;
}

/**
 * B2B Dealer Service.
 * Manages dealer networks, commissions, and territory-based operations.
 */
export class DealerService {
    constructor(
        private _client: Client,
        private _config: IDealerConfig
    ) { }

    /**
     * Fetches the network structure for a dealer.
     * 
     * @param dealerId - The unique ID of the dealer.
     * @returns Promise<IDealerNetwork>
     */
    public async fetchNetwork(dealerId: string): Promise<IDealerNetwork> {
        return this._client.get<IDealerNetwork>(`${this._config.networkEndpoint}/${dealerId}`);
    }

    /**
     * Calculates the earned commission for a specific sale.
     * Logic is based on the provided commission tiers.
     * 
     * @param amount - Total sale amount (INR).
     * @param category - Product category string.
     * @param currentVolume - Total volume sold by dealer this period.
     * @param tiers - The commission tier structure.
     * @returns number - Calculated commission in INR.
     */
    public calculateCommission(
        amount: number,
        category: string,
        currentVolume: number,
        tiers: ICommissionTier[]
    ): number {
        // Find matching tier for category and volume
        const tier = tiers.find(t =>
            t.productCategory === category &&
            currentVolume >= t.minVolume &&
            (t.maxVolume === undefined || currentVolume <= t.maxVolume)
        );

        if (!tier) return 0;

        return (amount * tier.commissionPercentage) / 100;
    }

    /**
     * Places a bulk order for a dealer to replenish stock.
     * 
     * @param orderData - Order payload.
     * @returns Promise<IOrder>
     */
    public async placeBulkOrder(orderData: Omit<IOrder, 'id' | 'created_at' | 'updated_at'>): Promise<IOrder> {
        return this._client.post<IOrder>(`${this._config.dealerOrdersEndpoint}/bulk`, {
            body: {
                ...orderData,
                orderType: 'b2b_bulk'
            }
        });
    }

    /**
     * Fetches all orders made by farmers within a dealer's territory.
     * 
     * @param territory - Territory identifier.
     * @returns Promise<IEnhancedOrder[]>
     */
    public async fetchTerritoryOrders(territory: string): Promise<IEnhancedOrder[]> {
        return this._client.get<IEnhancedOrder[]>(`${this._config.dealerOrdersEndpoint}/territory`, {
            params: { territory }
        });
    }

    /**
     * Adds a sub-dealer to the network.
     * 
     * @param parentDealerId - The dealer becoming the parent.
     * @param subDealerData - Profile data for new sub-dealer.
     */
    public async addSubDealer(parentDealerId: string, subDealerData: any): Promise<void> {
        await this._client.post(`${this._config.subDealerEndpoint}`, {
            body: {
                parentDealerId,
                ...subDealerData
            }
        });
    }
}
