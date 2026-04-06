"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type of Zoom meeting (schedule)
 * @author Gabe Abrams
 */
var ZoomMeetingType;
(function (ZoomMeetingType) {
    // Prescheduled meeting
    ZoomMeetingType[ZoomMeetingType["Prescheduled"] = 0] = "Prescheduled";
    // Instant meeting
    ZoomMeetingType[ZoomMeetingType["Instant"] = 1] = "Instant";
    // Scheduled meeting
    ZoomMeetingType[ZoomMeetingType["Scheduled"] = 2] = "Scheduled";
    // Recurring meeting with no fixed time
    ZoomMeetingType[ZoomMeetingType["RecurringNoFixedTime"] = 3] = "RecurringNoFixedTime";
    // Personal meeting ID
    ZoomMeetingType[ZoomMeetingType["Personal"] = 4] = "Personal";
    // Personal audio conference
    ZoomMeetingType[ZoomMeetingType["PersonalAudioConference"] = 7] = "PersonalAudioConference";
    // Recurring meeting with a fixed time
    ZoomMeetingType[ZoomMeetingType["RecurringFixedTime"] = 8] = "RecurringFixedTime";
})(ZoomMeetingType || (ZoomMeetingType = {}));
exports.default = ZoomMeetingType;
//# sourceMappingURL=ZoomMeetingType.js.map