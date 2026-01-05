"use strict";
/**
 * Main entry point for the KN Biosciences API Client Library.
 * Exports all public APIs for authentication, HTTP client, data models, and types.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWithRetry = exports.AuthService = exports.ApiError = exports.Client = void 0;
// Export API Client and related types
var client_1 = require("./api/client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return client_1.ApiError; } });
// Export Authentication Service and types
var auth_1 = require("./api/auth");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_1.AuthService; } });
// Export data models
__exportStar(require("./models"), exports);
// Export Agri-Aqua types
__exportStar(require("./types/agri-aqua"), exports);
// Export validation schemas
__exportStar(require("./schemas"), exports);
// Export utility functions
var retry_1 = require("./utils/retry");
Object.defineProperty(exports, "fetchWithRetry", { enumerable: true, get: function () { return retry_1.fetchWithRetry; } });
//# sourceMappingURL=index.js.map