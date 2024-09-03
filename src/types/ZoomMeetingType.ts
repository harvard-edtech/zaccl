/**
 * Type of Zoom meeting (schedule)
 * @author Gabe Abrams
 */
enum ZoomMeetingType {
  // Prescheduled meeting
  Prescheduled = 0,
  // Instant meeting
  Instant = 1,
  // Scheduled meeting
  Scheduled = 2,
  // Recurring meeting with no fixed time
  RecurringNoFixedTime = 3,
  // Personal meeting ID
  Personal = 4,
  // Personal audio conference
  PersonalAudioConference = 7,
  // Recurring meeting with a fixed time
  RecurringFixedTime = 8,
}

export default ZoomMeetingType;
