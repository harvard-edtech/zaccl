/**
 * Represents a participant in a Zoom past meeting.
 * @author Gabe Abrams
 */
type ZoomPastMeetingParticipant = {
  // Unique identifier for the participant
  id?: string;
  // Display name of the participant
  name?: string;
  // Zoom user ID of the participant
  user_id?: string;
  // Registration ID if participant registered beforehand
  registrant_id?: string;
  // Email address of the participant
  user_email?: string;
  // ISO 8601 timestamp when participant joined the meeting
  join_time?: string;
  // ISO 8601 timestamp when participant left the meeting
  leave_time?: string;
  // Duration in seconds that the participant was in the meeting
  duration?: number;
  // Indicates if participant connected via failover
  failover?: boolean;
  // Current status of the participant in the meeting
  status?: 'in_meeting' | 'in_waiting_room';
  // Indicates if the participant is an internal Zoom user
  internal_user?: boolean;
};

export default ZoomPastMeetingParticipant;
