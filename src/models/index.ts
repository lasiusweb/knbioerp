export interface IProduct {
    id: string;
    name: string;
    base_price: number;
    expiry_date: string;
}

export interface IBatch {
    product_id: string;
    quantity: number;
}

export interface IOrder {
    id: string;
    status: 'pending' | 'paid' | 'shipped';
    total_amount: number;
}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
};