/**
 * Types of Zoom meetings. This is a combination of multiple types in the Zoom
 *   API and can be found by combining fields from parts of the Zoom Meeting
 *   settings object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetings}
 *   and the Zoom Webinar settings object {@link https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/webinars}
 * @author Gabe Abrams
 */
declare enum ZoomMeetingOrWebinarType {
    InstantMeeting = 1,
    ScheduledMeeting = 2,
    RecurringMeetingNoFixedTime = 3,
    RecurringMeetingFixedTime = 8,
    PersonalAudioConference = 7,
    Webinar = 5,
    RecurringWebinarNoFixedTime = 6,
    RecurringWebinarFixedTime = 9,
    UploadedOrOther = 99
}
export default ZoomMeetingOrWebinarType;
