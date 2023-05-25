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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import axios
var axios_1 = __importDefault(require("axios"));
// Import shared classes
var Mutex_1 = __importDefault(require("../classes/Mutex"));
var ZACCLError_1 = __importDefault(require("../classes/ZACCLError"));
// Import shared types
var ErrorCode_1 = __importDefault(require("../types/ErrorCode"));
/*------------------------------------------------------------------------*/
/* ---------------------------- Static State ---------------------------- */
/*------------------------------------------------------------------------*/
// Current cached access token
var accessToken = null;
// Timestamp of when the current access token expires
var expiryTimestamp = 0;
// Mutex to lock when modifying access token
var accessTokenMutex = new Mutex_1.default();
/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/
// Buffer time (how long before the token expires should we refresh it)
var BUFFER_TIME_MS = 15 * 60 * 1000;
/*------------------------------------------------------------------------*/
/* -------------------------------- Main -------------------------------- */
/*------------------------------------------------------------------------*/
/**
 * Get a current Zoom access token
 * @author Gabe Abrams
 * @param zoomAPIConfig the original config for the Zoom API
 * @returns access token that's currently valid
 */
var getCurrentAccessToken = function (zoomAPIConfig) { return __awaiter(void 0, void 0, void 0, function () {
    var unlock, res, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, accessTokenMutex.lock()];
            case 1:
                unlock = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, 6, 7]);
                if (!
                // Token has never been cached
                (!accessToken
                    // Token has expired
                    || (Date.now() + BUFFER_TIME_MS > expiryTimestamp))) 
                // Token has never been cached
                return [3 /*break*/, 4];
                return [4 /*yield*/, (0, axios_1.default)({
                        method: 'POST',
                        url: "https://".concat(zoomAPIConfig.zoomHost, "/oauth/token?grant_type=account_credentials&account_id=").concat(zoomAPIConfig.accountId),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: "Basic ".concat(Buffer.from("".concat(zoomAPIConfig.clientId, ":").concat(zoomAPIConfig.clientSecret)).toString('base64')),
                        },
                    })];
            case 3:
                res = _a.sent();
                accessToken = res.data.access_token;
                expiryTimestamp = (
                // Current timestamp
                Date.now()
                    // + lifespan
                    + (res.data.expires_in * 1000)
                    // - five minutes of buffer time
                    - (5 * 60 * 1000));
                _a.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5:
                err_1 = _a.sent();
                throw new ZACCLError_1.default({
                    message: 'Failed to get access token',
                    code: ErrorCode_1.default.FailedToGetAccessToken,
                });
            case 6:
                // Unlock mutex
                console.log('Unlock');
                unlock();
                return [7 /*endfinally*/];
            case 7:
                // Make sure we have an access token
                if (!accessToken) {
                    throw new ZACCLError_1.default({
                        message: 'Failed to get access token',
                        code: ErrorCode_1.default.FailedToGetAccessToken,
                    });
                }
                // Return the access token
                return [2 /*return*/, accessToken];
        }
    });
}); };
exports.default = getCurrentAccessToken;
//# sourceMappingURL=getCurrentAccessToken.js.map