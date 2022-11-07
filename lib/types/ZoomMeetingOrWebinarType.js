"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Types of Zoom meetings
 * @author Gabe Abrams
 */
var ZoomMeetingOrWebinarType;
(function (ZoomMeetingOrWebinarType) {
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["InstantMeeting"] = 1] = "InstantMeeting";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["ScheduledMeeting"] = 2] = "ScheduledMeeting";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["RecurringMeetingNoFixedTime"] = 3] = "RecurringMeetingNoFixedTime";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["RecurringMeetingFixedTime"] = 8] = "RecurringMeetingFixedTime";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["PersonalAudioConference"] = 7] = "PersonalAudioConference";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["Webinar"] = 5] = "Webinar";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["RecurringWebinarNoFixedTime"] = 6] = "RecurringWebinarNoFixedTime";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["RecurringWebinarFixedTime"] = 9] = "RecurringWebinarFixedTime";
    ZoomMeetingOrWebinarType[ZoomMeetingOrWebinarType["UploadedOrOther"] = 99] = "UploadedOrOther";
})(ZoomMeetingOrWebinarType || (ZoomMeetingOrWebinarType = {}));
exports.default = ZoomMeetingOrWebinarType;
//# sourceMappingURL=ZoomMeetingOrWebinarType.js.map