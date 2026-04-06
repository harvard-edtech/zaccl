import ZoomRecordingFile from './ZoomRecordingFile';
/**
 * A single recording in an account
 * @author Gabe Abrams
 */
type ZoomRecordingInAccount = {
    duration: number;
    host_id: string;
    id: number;
    recording_count: number;
    recording_files: ZoomRecordingFile[];
    start_time: string;
    topic: string;
    total_size: number;
    type: number;
    uuid: string;
    rc_zone?: string;
    instance_id?: string;
    service_name?: string;
    external_storage_addr?: string;
};
export default ZoomRecordingInAccount;
