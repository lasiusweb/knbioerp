import { z } from 'zod';

/**
 * Schema for OAuth2 token response
 */
export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

/**
 * Schema for login request payload
 */
export const LoginRequestSchema = z.object({
  grant_type: z.literal('password'),
  client_id: z.string(),
  client_secret: z.string(),
  username: z.string(),
  password: z.string(),
});

/**
 * Schema for refresh token request payload
 */
export const RefreshTokenRequestSchema = z.object({
  grant_type: z.literal('refresh_token'),
  refresh_token: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
});

/**
 * Schema for user registration request payload
 */
export const RegistrationRequestSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  // Add other fields as needed
});

/**
 * Schema for registration response
 */
export const RegistrationResponseSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  email: z.string(),
  message: z.string(),
});

/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>;
export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;

/**
 * Schema for OAuth2 token response
 */
export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

/**
 * Schema for login request payload
 */
export const LoginRequestSchema = z.object({
  grant_type: z.literal('password'),
  client_id: z.string(),
  client_secret: z.string(),
  username: z.string(),
  password: z.string(),
});

/**
 * Schema for refresh token request payload
 */
export const RefreshTokenRequestSchema = z.object({
  grant_type: z.literal('refresh_token'),
  refresh_token: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
});

/**
 * Schema for user registration request payload
 */
export const RegistrationRequestSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  // Add other fields as needed
});

/**
 * Schema for registration response
 */
export const RegistrationResponseSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  email: z.string(),
  message: z.string(),
});

/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>;
export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;
/**
 * Schema for OAuth2 token response
 */
export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

/**
 * Schema for login request payload
 */
export const LoginRequestSchema = z.object({
  grant_type: z.literal('password'),
  client_id: z.string(),
  client_secret: z.string(),
  username: z.string(),
  password: z.string(),
});

/**
 * Schema for refresh token request payload
 */
export const RefreshTokenRequestSchema = z.object({
  grant_type: z.literal('refresh_token'),
  refresh_token: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
});

/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

/**
 * Schema for OAuth2 token response
 */
export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

/**
 * Schema for login request payload
 */
export const LoginRequestSchema = z.object({
  grant_type: z.literal('password'),
  client_id: z.string(),
  client_secret: z.string(),
  username: z.string(),
  password: z.string(),
});

/**
 * Schema for refresh token request payload
 */
export const RefreshTokenRequestSchema = z.object({
  grant_type: z.literal('refresh_token'),
  refresh_token: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
});

/**
 * Schema for user registration request payload
 */
export const RegistrationRequestSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  // Add other fields as needed
});

/**
 * Schema for registration response
 */
export const RegistrationResponseSchema = z.object({
  user_id: z.string(),
  username: z.string(),
  email: z.string(),
  message: z.string(),
});

/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
export type RegistrationRequest = z.infer<typeof RegistrationRequestSchema>;
export type RegistrationResponse = z.infer<typeof RegistrationResponseSchema>;
/**
 * Schema for OAuth2 token response
 */
export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
});

/**
 * Schema for login request payload
 */
export const LoginRequestSchema = z.object({
  grant_type: z.literal('password'),
  client_id: z.string(),
  client_secret: z.string(),
  username: z.string(),
  password: z.string(),
});

/**
 * Schema for refresh token request payload
 */
export const RefreshTokenRequestSchema = z.object({
  grant_type: z.literal('refresh_token'),
  refresh_token: z.string(),
  client_id: z.string(),
  client_secret: z.string(),
});

/**
 * Type inference from schemas
 */
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

