"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRequestSchema = exports.LoginRequestSchema = exports.TokenResponseSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema for OAuth2 token response
 */
exports.TokenResponseSchema = zod_1.z.object({
    access_token: zod_1.z.string(),
    refresh_token: zod_1.z.string(),
    expires_in: zod_1.z.number(),
    token_type: zod_1.z.string(),
});
/**
 * Schema for login request payload
 */
exports.LoginRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('password'),
    client_id: zod_1.z.string(),
    client_secret: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
/**
 * Schema for refresh token request payload
 */
exports.RefreshTokenRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('refresh_token'),
    refresh_token: zod_1.z.string(),
    client_id: zod_1.z.string(),
    client_secret: zod_1.z.string(),
});
/**
 * Schema for OAuth2 token response
 */
exports.TokenResponseSchema = zod_1.z.object({
    access_token: zod_1.z.string(),
    refresh_token: zod_1.z.string(),
    expires_in: zod_1.z.number(),
    token_type: zod_1.z.string(),
});
/**
 * Schema for login request payload
 */
exports.LoginRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('password'),
    client_id: zod_1.z.string(),
    client_secret: zod_1.z.string(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
/**
 * Schema for refresh token request payload
 */
exports.RefreshTokenRequestSchema = zod_1.z.object({
    grant_type: zod_1.z.literal('refresh_token'),
    refresh_token: zod_1.z.string(),
    client_id: zod_1.z.string(),
    client_secret: zod_1.z.string(),
});
//# sourceMappingURL=auth.js.map