"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Current state of a poll
 * @author Yuen Ler Chow
 */
var ZoomPollStatus;
(function (ZoomPollStatus) {
    // Poll has not started
    ZoomPollStatus["NotStart"] = "NotStart";
    // Poll has started
    ZoomPollStatus["Started"] = "Started";
    // Poll has ended
    ZoomPollStatus["Ended"] = "Ended";
    // Host is sharing results
    ZoomPollStatus["Sharing"] = "Sharing";
})(ZoomPollStatus || (ZoomPollStatus = {}));
exports.default = ZoomPollStatus;
//# sourceMappingURL=ZoomPollStatus.js.map