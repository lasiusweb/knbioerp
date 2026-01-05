"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseSchema = exports.OrderSchema = exports.BatchSchema = exports.ProductSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for Product
 */
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    base_price: zod_1.z.number(),
    expiry_date: zod_1.z.string(), // ISO date string
});
/**
 * Schema for Batch
 */
exports.BatchSchema = zod_1.z.object({
    product_id: zod_1.z.string(),
    quantity: zod_1.z.number(),
});
/**
 * Schema for Order
 */
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    status: zod_1.z.enum(['pending', 'paid', 'shipped']),
    total_amount: zod_1.z.number(),
});
/**
 * Schema for API Response wrapper
 */
const ApiResponseSchema = (dataSchema) => zod_1.z.object({
    data: dataSchema,
    error: zod_1.z.string().nullable(),
});
exports.ApiResponseSchema = ApiResponseSchema;
/**
 * Schema for Product
 */
exports.ProductSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    base_price: zod_1.z.number(),
    expiry_date: zod_1.z.string(), // ISO date string
});
/**
 * Schema for Batch
 */
exports.BatchSchema = zod_1.z.object({
    product_id: zod_1.z.string(),
    quantity: zod_1.z.number(),
});
/**
 * Schema for Order
 */
exports.OrderSchema = zod_1.z.object({
    id: zod_1.z.string(),
    status: zod_1.z.enum(['pending', 'paid', 'shipped']),
    total_amount: zod_1.z.number(),
});
/**
 * Schema for API Response wrapper
 */
const ApiResponseSchema = (dataSchema) => zod_1.z.object({
    data: dataSchema,
    error: zod_1.z.string().nullable(),
});
exports.ApiResponseSchema = ApiResponseSchema;
//# sourceMappingURL=models.js.map