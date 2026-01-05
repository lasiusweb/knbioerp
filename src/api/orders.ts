import { Client } from './client';
import { IOrder } from '../models';

/**
 * Configuration for order service.
 */
export interface IOrderConfig {
    /** RFQ threshold amount. If order total exceeds this, create RFQ instead. */
    rfqThreshold: number;
    /** Base endpoint for orders. */
    ordersEndpoint: string;
    /** Endpoint for RFQ. */
    rfqEndpoint?: string;
}

/**
 * Service for managing orders, including creation, RFQ handling, and history fetching.
 */
export class OrderService {
    constructor(
        private _client: Client,
        private _config: IOrderConfig
    ) { }

    /**
     * Creates a new order.
     * If the total amount exceeds the RFQ threshold, creates an RFQ instead.
     *
     * @param orderData - The order data to create.
     * @returns Promise<IOrder> - The created order or RFQ response.
     */
    public async createOrder(orderData: Omit<IOrder, 'id' | 'created_at' | 'updated_at'>): Promise<IOrder> {
        // Calculate total amount
        const totalAmount = orderData.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);

        if (totalAmount > this._config.rfqThreshold) {
            // Handle RFQ
            return this.handleRFQThreshold(orderData);
        }

        // Create direct order
        const response = await this._client.post<IOrder>(this._config.ordersEndpoint, {
            body: orderData
        });

        return response;
    }

    /**
     * Handles the RFQ threshold logic by creating an RFQ instead of direct order.
     *
     * @param orderData - The order data that triggered RFQ.
     * @returns Promise<IOrder> - The RFQ response (treated as order for simplicity).
     */
    public async handleRFQThreshold(orderData: Omit<IOrder, 'id' | 'created_at' | 'updated_at'>): Promise<IOrder> {
        // For now, create an RFQ via a different endpoint or flag
        const rfqData = {
            ...orderData,
            type: 'rfq', // Flag as RFQ
        };

        const endpoint = this._config.rfqEndpoint || `${this._config.ordersEndpoint}/rfq`;

        const response = await this._client.post<IOrder>(endpoint, {
            body: rfqData
        });

        return response;
    }

    /**
     * Fetches the order history for a customer.
     *
     * @param customerId - The customer ID.
     * @param limit - Optional limit for number of orders.
     * @returns Promise<IOrder[]> - Array of orders.
     */
    public async fetchOrderHistory(customerId: string, limit?: number): Promise<IOrder[]> {
        const params: Record<string, string | number> = { customer_id: customerId };
        if (limit) {
            params.limit = limit;
        }

        const response = await this._client.get<IOrder[]>(`${this._config.ordersEndpoint}/history`, {
            params
        });

        return response;
    }
}
