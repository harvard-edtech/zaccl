import ZoomMeetingOrWebinarType from './ZoomMeetingOrWebinarType';
import ZoomRecordingFile from './ZoomRecordingFIle';
/**
 * Object containing Zoom meeting recordings
 * @author Gabe Abrams
 */
declare type ZoomMeetingRecordings = {
    account_id: string;
    duration: number;
    host_id: string;
    id: number;
    recording_count: number;
    start_time: string;
    topic: string;
    total_size: number;
    type: ZoomMeetingOrWebinarType;
    uuid: string;
    recording_files?: ZoomRecordingFile[];
};
export default ZoomMeetingRecordings;
