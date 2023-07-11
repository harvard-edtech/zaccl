"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type of config (based on type of credentials)
 * @author Gabe Abrams
 */
var ZoomAPIConfigType;
(function (ZoomAPIConfigType) {
    // ZACCL generates its own tokens via JWT
    ZoomAPIConfigType["JWT"] = "JWT";
    // User provides a token OR this is the Harvard Apigee token
    ZoomAPIConfigType["Token"] = "Token";
    // User provides OAuth credentials
    ZoomAPIConfigType["OAuth"] = "OAuth";
})(ZoomAPIConfigType || (ZoomAPIConfigType = {}));
exports.default = ZoomAPIConfigType;
//# sourceMappingURL=ZoomAPIConfigType.js.map