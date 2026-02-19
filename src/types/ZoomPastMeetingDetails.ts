/**
 * Details about a past meeting
 * @author Gabe Abrams
 */
type ZoomPastMeetingDetails = {
  // The meeting ID,
  id: number,
  // The meeting's UUID
  uuid: string,
  // The meeting's duration, in minutes
  duration: number,
  // The meeting's start date and time
  start_time: string,
  // The meeting's end date and time
  end_time: string,
  // The host's ID
  host_id: string,
  // The meeting host's department
  dept: string,
  // The number of meeting participants
  participants_count: number,
  // Whether the meeting was created directly through Zoom or via an API request
  source: string,
  // The meeting's topic
  topic: string,
  // The total number of minutes attended by the meeting's host and participants
  total_minutes: number,
  // The meeting type (0-4, 7-8)
  type: 0 | 1 | 2 | 3 | 4 | 7 | 8,
  // The user's email address
  user_email: string,
  // The user's display name
  user_name: string,
  // Whether the summary feature was used in the meeting
  has_meeting_summary: boolean,
};

export default ZoomPastMeetingDetails;
