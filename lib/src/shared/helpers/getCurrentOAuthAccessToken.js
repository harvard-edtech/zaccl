"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import shared classes
const Mutex_1 = __importDefault(require("../classes/Mutex"));
const ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
// Import shared types
const ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
const ZoomAPIConfigType_1 = __importDefault(require("../../types/ZoomAPIConfigType"));
/*------------------------------------------------------------------------*/
/* ---------------------------- Static State ---------------------------- */
/*------------------------------------------------------------------------*/
// Current cached access token
let accessToken = null;
// Timestamp of when the current access token expires
let expiryTimestamp = 0;
// Mutex to lock when modifying access token
const accessTokenMutex = new Mutex_1.default();
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// Buffer time (how long before the token expires should we refresh it)
const BUFFER_TIME_MS = 15 * 60 * 1000;
/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/
/**
 * Get a current Zoom access token
 * @author Gabe Abrams
 * @param zoomAPIConfig the original config for the Zoom API
 * @returns access token that's currently valid
 */
const getCurrentOAuthAccessToken = (zoomAPIConfig) => __awaiter(void 0, void 0, void 0, function* () {
    // Throw error if wrong type of config
    if (zoomAPIConfig.type !== ZoomAPIConfigType_1.default.OAuth) {
        throw new ZACCLError_1.default({
            message: 'Wrong Zoom API config: must be OAuth in order to get current access token',
            code: ErrorCode_1.default.WrongZoomAPIConfig,
        });
    }
    // Refresh token if necessary
    let unlock = () => { };
    try {
        // Lock mutex
        unlock = yield accessTokenMutex.lock();
        // Check if we need to refresh the token
        if (
        // Token has never been cached
        !accessToken
            // Token has expired
            || (Date.now() + BUFFER_TIME_MS > expiryTimestamp)) {
            // Token is expired, refresh it
            const res = yield fetch(`https://${zoomAPIConfig.zoomHost}/oauth/token?grant_type=account_credentials&account_id=${zoomAPIConfig.accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${zoomAPIConfig.clientId}:${zoomAPIConfig.clientSecret}`).toString('base64')}`,
                },
            });
            // Throw if the request failed
            if (!res.ok) {
                throw new Error(`OAuth token request failed with status ${res.status}`);
            }
            const data = yield res.json();
            accessToken = data.access_token;
            expiryTimestamp = (
            // Current timestamp
            Date.now()
                // + lifespan
                + (data.expires_in * 1000)
                // - five minutes of buffer time
                - (5 * 60 * 1000));
        }
    }
    catch (err) {
        throw new ZACCLError_1.default({
            message: 'Failed to get access token',
            code: ErrorCode_1.default.FailedToGetAccessToken,
        });
    }
    finally {
        // Unlock mutex
        unlock();
    }
    // Make sure we have an access token
    if (!accessToken) {
        throw new ZACCLError_1.default({
            message: 'Failed to get access token',
            code: ErrorCode_1.default.FailedToGetAccessToken,
        });
    }
    // Return the access token
    return accessToken;
});
exports.default = getCurrentOAuthAccessToken;
//# sourceMappingURL=getCurrentOAuthAccessToken.js.map