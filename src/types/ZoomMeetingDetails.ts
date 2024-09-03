// Import shared types
import ZoomLoginMethod from './ZoomLoginMethod';

/**
 * Zoom user object {@link https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/pastMeetingDetails}
 * @author Yuen Ler Chow
 */
type ZoomMeetingDetails = {
  // The meeting ID.
  id: number;
  // The meeting's UUID. Must be double encoded if it starts with '/' or contains '//'.
  uuid: string;
  // The meeting's duration, in minutes.
  duration: number;
  // The meeting's start date and time (ISO 8601 format).
  start_time: string;
  // The meeting's end date and time (ISO 8601 format).
  end_time: string;
  // The host's ID.
  host_id: string;
  // The meeting host's department.
  dept: string;
  // The number of meeting participants.
  participants_count: number;
  // Source of the meeting creation (Zoom, OAuth app name, JWT, etc.).
  source: string;
  // The meeting's topic.
  topic: string;
  // Total number of minutes attended by the host and participants.
  total_minutes: number;
  // The meeting type (0: Prescheduled, 1: Instant, etc.).
  type: 0 | 1 | 2 | 3 | 4 | 7 | 8;
  // The user's email address (should follow email format).
  user_email: string;
  // The user's display name.
  user_name: string;
};


export default ZoomMeetingDetails;
