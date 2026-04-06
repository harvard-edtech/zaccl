/**
 * Details about a past meeting
 * @author Gabe Abrams
 */
type ZoomPastMeetingDetails = {
    id: number;
    uuid: string;
    duration: number;
    start_time: string;
    end_time: string;
    host_id: string;
    dept: string;
    participants_count: number;
    source: string;
    topic: string;
    total_minutes: number;
    type: 0 | 1 | 2 | 3 | 4 | 7 | 8;
    user_email: string;
    user_name: string;
    has_meeting_summary: boolean;
};
export default ZoomPastMeetingDetails;
