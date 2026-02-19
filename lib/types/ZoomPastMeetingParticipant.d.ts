/**
 * Represents a participant in a Zoom past meeting.
 * @author Gabe Abrams
 */
type ZoomPastMeetingParticipant = {
    id?: string;
    name?: string;
    user_id?: string;
    registrant_id?: string;
    user_email?: string;
    join_time?: string;
    leave_time?: string;
    duration?: number;
    failover?: boolean;
    status?: 'in_meeting' | 'in_waiting_room';
    internal_user?: boolean;
};
export default ZoomPastMeetingParticipant;
