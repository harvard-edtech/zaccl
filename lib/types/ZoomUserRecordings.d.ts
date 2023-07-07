import ZoomMeetingRecordings from './ZoomMeetingRecordings';
/**
 * List of recordings for a user
 * @author Gabe Abrams
 */
type ZoomUserRecordings = {
    from: string;
    to: string;
    next_page_token: string;
    page_count: number;
    page_size: number;
    total_records: number;
    meetings: ZoomMeetingRecordings[];
};
export default ZoomUserRecordings;
