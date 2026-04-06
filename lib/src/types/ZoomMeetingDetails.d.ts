import ZoomMeetingType from './ZoomMeetingType';
/**
 * Zoom user object {@link https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/pastMeetingDetails}
 * @author Yuen Ler Chow
 */
type ZoomMeetingDetails = {
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
    type: ZoomMeetingType;
    user_email: string;
    user_name: string;
};
export default ZoomMeetingDetails;
