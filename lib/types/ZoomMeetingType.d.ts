/**
 * Type of Zoom meeting (schedule)
 * @author Gabe Abrams
 */
declare enum ZoomMeetingType {
    Prescheduled = 0,
    Instant = 1,
    Scheduled = 2,
    RecurringNoFixedTime = 3,
    Personal = 4,
    PersonalAudioConference = 7,
    RecurringFixedTime = 8
}
export default ZoomMeetingType;
