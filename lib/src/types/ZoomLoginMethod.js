"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Method of login for Zoom
 * @author Gabe Abrams
 */
var ZoomLoginMethod;
(function (ZoomLoginMethod) {
    ZoomLoginMethod[ZoomLoginMethod["Facebook"] = 0] = "Facebook";
    ZoomLoginMethod[ZoomLoginMethod["Google"] = 1] = "Google";
    ZoomLoginMethod[ZoomLoginMethod["Apple"] = 24] = "Apple";
    ZoomLoginMethod[ZoomLoginMethod["Microsoft"] = 27] = "Microsoft";
    ZoomLoginMethod[ZoomLoginMethod["MobileDevice"] = 97] = "MobileDevice";
    ZoomLoginMethod[ZoomLoginMethod["RingCentral"] = 98] = "RingCentral";
    ZoomLoginMethod[ZoomLoginMethod["APIUser"] = 99] = "APIUser";
    ZoomLoginMethod[ZoomLoginMethod["ZoomWorkEmail"] = 100] = "ZoomWorkEmail";
    ZoomLoginMethod[ZoomLoginMethod["SingleSignOn"] = 101] = "SingleSignOn";
})(ZoomLoginMethod || (ZoomLoginMethod = {}));
exports.default = ZoomLoginMethod;
//# sourceMappingURL=ZoomLoginMethod.js.map