import ZoomFileType from './ZoomFileType';
import ZoomRecordingType from './ZoomRecordingType';

/**
 * A Zoom recording file (one view)
 * @author Gabe Abrams
 */
type ZoomRecordingFile = (
  {
    // The time at which recording was deleted, if it was deleted.
    // Returned in the response only for trash query. ISO 8601
    deleted_time?: string,
    // The URL at which to download the the recording.
    download_url: string,
    // The file extension type of the recording file.
    file_extension: ('MP4' | 'M4A' | 'TXT' | 'VTT' | 'CSV' | 'JSON' | 'JPG'),
    // The meeting ID.
    meeting_id: string,
    // The recording end time. Response in general query.
    recording_end: string,
    // The recording start time.
    recording_start: string,
    // The JWT token to download the meeting's recording.
    // This response only returns if the download_access_token is included in
    // the include_fields query parameter.
    download_access_token?: string,
    // The cloud recording's password
    password?: string,
    // The cloud recording's password to be used in the URL. This recording's
    // password can be directly spliced in play_url or share_url with ?pwd= to
    // access and play. For example,
    // 'https://zoom.us/rec/share/**************?pwd=yNYIS408EJygs7rE5vV'.
    // If you want to use this field, please contact Zoom support.
    recording_play_passcode?: string,
  } & (
    | {
      // Type of file
      file_type: (
        | ZoomFileType.ClosedCaptions
        | ZoomFileType.Timeline
      ),
    }
    | {
      // Type of file
      file_type: (
        | ZoomFileType.VideoFile
        | ZoomFileType.AudioOnlyFile
        | ZoomFileType.Transcript
        | ZoomFileType.Chat
        | ZoomFileType.PollingData
        | ZoomFileType.RecordingSummary
      ),
      // The recording file size.
      file_size: number,
      // The recording status.
      status: 'completed',
      // The recording file ID. Included in the response of general query.
      id: string,
      // The recording type. 
      recording_type: ZoomRecordingType,
      // The URL using which a recording file can be played.
      play_url: string,
    }
  )
);

export default ZoomRecordingFile;
