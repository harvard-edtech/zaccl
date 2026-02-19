/**
 * Transcript for a specific zoom meeting instance
 * @author Gabe Abrams
 */
type ZoomMeetingTranscript = {
  // The meeting ID
  meeting_id: string,
  // The user account's unique identifier.
  account_id: string,
  // The meeting topic.
  meeting_topic: string,
  // ID of the user set as the host of the meeting.
  host_id: string,
  // The date and time that the meeting's transcript was created.
  transcript_created_time: string,
  // Whether the meeting transcript is available for download.
  can_download: boolean,
  // Auto-delete status of a meeting's transcript
  auto_delete: boolean,
  // The date when the recording will be auto-deleted when `auto_delete` is true.
  auto_delete_date: string,
  // The URL to download the transcript. Present only when `can_download` is `true`.
  download_url: string | null,
  // The reason why the transcript cannot be downloaded when `can_download` is `false`.
  download_restriction_reason: 'DELETED_OR_TRASHED' | 'UNSUPPORTED' | 'NO_TRANSCRIPT_DATA' | 'NOT_READY' | null,
};

export default ZoomMeetingTranscript;
