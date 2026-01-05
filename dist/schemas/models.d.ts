import { z } from 'zod';
/**
 * Schema for Product
 */
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    base_price: z.ZodNumber;
    expiry_date: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    base_price: number;
    expiry_date: string;
}, {
    id: string;
    name: string;
    base_price: number;
    expiry_date: string;
}>;
/**
 * Schema for Batch
 */
export declare const BatchSchema: z.ZodObject<{
    product_id: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    product_id: string;
    quantity: number;
}, {
    product_id: string;
    quantity: number;
}>;
/**
 * Schema for Order
 */
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<["pending", "paid", "shipped"]>;
    total_amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "paid" | "shipped";
    id: string;
    total_amount: number;
}, {
    status: "pending" | "paid" | "shipped";
    id: string;
    total_amount: number;
}>;
/**
 * Schema for API Response wrapper
 */
export declare const ApiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: T;
    error: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    error: z.ZodNullable<z.ZodString>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    data: T;
    error: z.ZodNullable<z.ZodString>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
/**
 * Type inference from schemas
 */
export type Product = z.infer<typeof ProductSchema>;
export type Batch = z.infer<typeof BatchSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>;
/**
 * Schema for Product
 */
export declare const ProductSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    base_price: z.ZodNumber;
    expiry_date: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    base_price: number;
    expiry_date: string;
}, {
    id: string;
    name: string;
    base_price: number;
    expiry_date: string;
}>;
/**
 * Schema for Batch
 */
export declare const BatchSchema: z.ZodObject<{
    product_id: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    product_id: string;
    quantity: number;
}, {
    product_id: string;
    quantity: number;
}>;
/**
 * Schema for Order
 */
export declare const OrderSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<["pending", "paid", "shipped"]>;
    total_amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "paid" | "shipped";
    id: string;
    total_amount: number;
}, {
    status: "pending" | "paid" | "shipped";
    id: string;
    total_amount: number;
}>;
/**
 * Schema for API Response wrapper
 */
export declare const ApiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => z.ZodObject<{
    data: T;
    error: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<{
    data: T;
    error: z.ZodNullable<z.ZodString>;
}>, any> extends infer T_1 ? { [k in keyof T_1]: T_1[k]; } : never, z.baseObjectInputType<{
    data: T;
    error: z.ZodNullable<z.ZodString>;
}> extends infer T_2 ? { [k_1 in keyof T_2]: T_2[k_1]; } : never>;
/**
 * Type inference from schemas
 */
export type Product = z.infer<typeof ProductSchema>;
export type Batch = z.infer<typeof BatchSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>;
//# sourceMappingURL=models.d.ts.map