/**
 * Transcript for a specific zoom meeting instance
 * @author Gabe Abrams
 */
type ZoomMeetingTranscript = {
    meeting_id: string;
    account_id: string;
    meeting_topic: string;
    host_id: string;
    transcript_created_time: string;
    can_download: boolean;
    auto_delete: boolean;
    auto_delete_date: string;
    download_url: string | null;
    download_restriction_reason: 'DELETED_OR_TRASHED' | 'UNSUPPORTED' | 'NO_TRANSCRIPT_DATA' | 'NOT_READY' | null;
};
export default ZoomMeetingTranscript;
