/**
 * A single participant in a Zoom meeting participant report
 * @author Gabe Abrams
 */
type ZoomParticipantInReport = {
    customer_key: string;
    duration: number;
    failover: boolean;
    id: string;
    join_time: string;
    leave_time: string;
    name: string;
    registrant_id: string;
    status: 'in_meeting' | 'in_waiting_room';
    user_email: string;
    user_id: string;
    bo_mtg_id: string;
    participant_user_id: string;
};
export default ZoomParticipantInReport;
