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
// Import libs
var path_1 = __importDefault(require("path"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Import shared helpers
var sendRequest_1 = __importDefault(require("./sendRequest"));
// Import shared constants
var HARVARD_APIGEE_HOSTNAME_SUFFIX_1 = __importDefault(require("../constants/HARVARD_APIGEE_HOSTNAME_SUFFIX"));
var ZOOM_HOSTNAME_1 = __importDefault(require("../constants/ZOOM_HOSTNAME"));
// How long to wait before expiring requests
var EXPIRY_SEC = 60;
/* -------------------------- Function -------------------------- */
/**
 * Send an API request to Zoom
 * @author Gabe Abrams
 * @param opts object containing all arguments
 * @param opts.path Path of the endpoint
 * @param opts.method http method to use for the request
 * @param opts.action Human-readable description of the task
 * @param [opts.params] Parameters/args/body to send with request
 * @param opts.zoomAPIConfig api configuration
 */
var sendZoomRequest = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var method, params, zoomAPIConfig, usingHarvardApigee, token, headers, fullPath;
    var _a;
    return __generator(this, function (_b) {
        method = opts.method, params = opts.params, zoomAPIConfig = opts.zoomAPIConfig;
        usingHarvardApigee = (zoomAPIConfig.zoomHost
            && zoomAPIConfig.zoomHost.indexOf(HARVARD_APIGEE_HOSTNAME_SUFFIX_1.default) >= 0);
        if (opts.zoomAPIConfig.token) {
            // Use existing token
            (token = opts.token);
        }
        else {
            // Generate a token
            token = jsonwebtoken_1.default.sign({
                iss: opts.key,
                exp: (Date.now() + (EXPIRY_SEC * 1000)),
            }, opts.secret);
        }
        headers = {};
        if (usingHarvardApigee) {
            // Using Harvard Apigee system
            headers['X-Api-Key'] = token;
        }
        else {
            // Directly contacting Zoom
            headers.Authorization = "Bearer ".concat(token);
        }
        fullPath = (usingHarvardApigee
            ? opts.path.split('?')[0] // Apigee doesn't support versioning yet (as of 12/16/20)
            : path_1.default.join('/v2', opts.path));
        /* ---------------------- Send the Request ---------------------- */
        return [2 /*return*/, (0, sendRequest_1.default)({
                params: params,
                method: method,
                headers: headers,
                path: fullPath,
                host: ((_a = zoomAPIConfig.zoomHost) !== null && _a !== void 0 ? _a : ZOOM_HOSTNAME_1.default),
            })];
    });
}); };
exports.default = sendZoomRequest;
//# sourceMappingURL=sendZoomRequest.js.map