"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Type of a Zoom file
 * @author Gabe Abrams
 */
var ZoomFileType;
(function (ZoomFileType) {
    // Video file of the recording.
    ZoomFileType["VideoFile"] = "MP4";
    // Audio-only file of the recording.
    ZoomFileType["AudioOnlyFile"] = "M4A";
    // Timestamp file of the recording in JSON file format. To get a timeline
    // file, the "Add a timestamp to the recording" setting must be enabled in
    // the recording settings. The time will display in the host's timezone,
    // set on their Zoom profile
    ZoomFileType["Timeline"] = "TIMELINE";
    // Transcription file of the recording in VTT format.
    ZoomFileType["Transcript"] = "TRANSCRIPT";
    // A TXT file containing in-meeting chat messages that were sent during
    // the meeting.
    ZoomFileType["Chat"] = "CHAT";
    // File containing closed captions of the recording in VTT file format.
    ZoomFileType["ClosedCaptions"] = "CC";
    // File containing polling data in csv format.
    ZoomFileType["PollingData"] = "CSV";
    // Summary file of the recording in JSON format
    ZoomFileType["RecordingSummary"] = "SUMMARY";
})(ZoomFileType || (ZoomFileType = {}));
exports.default = ZoomFileType;
//# sourceMappingURL=ZoomFileType.js.map