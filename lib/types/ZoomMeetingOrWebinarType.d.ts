/**
 * Types of Zoom meetings
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
