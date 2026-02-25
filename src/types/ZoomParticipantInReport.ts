/**
 * A single participant in a Zoom meeting participant report
 * @author Gabe Abrams
 */
type ZoomParticipantInReport = {
  // The participant's SDK identifier, alphanumeric, max 35 characters
  customer_key: string,
  // Participant duration in seconds (join_time - leave_time)
  duration: number,
  // Indicates if failover happened during the meeting
  failover: boolean,
  // Participant's UUID (use participant_user_id instead)
  id: string,
  // Participant join time
  join_time: string,
  // Participant leave time
  leave_time: string,
  // Participant display name
  name: string,
  // Unique identifier of the registrant
  registrant_id: string,
  // Participant status: in_meeting or in_waiting_room
  status: 'in_meeting' | 'in_waiting_room',
  // Participant email address
  user_email: string,
  // Participant ID, unique for that meeting only
  user_id: string,
  // Breakout room ID
  bo_mtg_id: string,
  // Participant's universally unique ID (UUID)
  participant_user_id: string,
};

export default ZoomParticipantInReport;
