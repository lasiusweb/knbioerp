import { z } from 'zod';

/**
 * Schema for Product
 */
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  base_price: z.number(),
  expiry_date: z.string(), // ISO date string
});

/**
 * Schema for Batch
 */
export const BatchSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
});

/**
 * Schema for Order
 */
export const OrderSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'paid', 'shipped']),
  total_amount: z.number(),
});

/**
 * Schema for API Response wrapper
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    error: z.string().nullable(),
  });

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
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  base_price: z.number(),
  expiry_date: z.string(), // ISO date string
});

/**
 * Schema for Batch
 */
export const BatchSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
});

/**
 * Schema for Order
 */
export const OrderSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'paid', 'shipped']),
  total_amount: z.number(),
});

/**
 * Schema for API Response wrapper
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    error: z.string().nullable(),
  });

/**
 * Type inference from schemas
 */
export type Product = z.infer<typeof ProductSchema>;
export type Batch = z.infer<typeof BatchSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type ApiResponse<T> = z.infer<ReturnType<typeof ApiResponseSchema<z.ZodType<T>>>>;
