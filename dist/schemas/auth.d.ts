import { z } from 'zod';
/**
 * Schema for OAuth2 token response
 */
export declare const TokenResponseSchema: z.ZodObject<{
    access_token: z.ZodString;
    refresh_token: z.ZodString;
    expires_in: z.ZodNumber;
    token_type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}, {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}>;
/**
 * Schema for login request payload
 */
export declare const LoginRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"password">;
    client_id: z.ZodString;
    client_secret: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    grant_type: "password";
    password: string;
    client_id: string;
    client_secret: string;
    username: string;
}, {
    grant_type: "password";
    password: string;
    client_id: string;
    client_secret: string;
    username: string;
}>;
/**
 * Schema for refresh token request payload
 */
export declare const RefreshTokenRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"refresh_token">;
    refresh_token: z.ZodString;
    client_id: z.ZodString;
    client_secret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refresh_token: string;
    grant_type: "refresh_token";
    client_id: string;
    client_secret: string;
}, {
    refresh_token: string;
    grant_type: "refresh_token";
    client_id: string;
    client_secret: string;
}>;
/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
/**
 * Schema for OAuth2 token response
 */
export declare const TokenResponseSchema: z.ZodObject<{
    access_token: z.ZodString;
    refresh_token: z.ZodString;
    expires_in: z.ZodNumber;
    token_type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}, {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}>;
/**
 * Schema for login request payload
 */
export declare const LoginRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"password">;
    client_id: z.ZodString;
    client_secret: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    grant_type: "password";
    password: string;
    client_id: string;
    client_secret: string;
    username: string;
}, {
    grant_type: "password";
    password: string;
    client_id: string;
    client_secret: string;
    username: string;
}>;
/**
 * Schema for refresh token request payload
 */
export declare const RefreshTokenRequestSchema: z.ZodObject<{
    grant_type: z.ZodLiteral<"refresh_token">;
    refresh_token: z.ZodString;
    client_id: z.ZodString;
    client_secret: z.ZodString;
}, "strip", z.ZodTypeAny, {
    refresh_token: string;
    grant_type: "refresh_token";
    client_id: string;
    client_secret: string;
}, {
    refresh_token: string;
    grant_type: "refresh_token";
    client_id: string;
    client_secret: string;
}>;
/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
//# sourceMappingURL=auth.d.ts.map