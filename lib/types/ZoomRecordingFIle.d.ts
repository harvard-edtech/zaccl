import ZoomFileType from './ZoomFileType';
import ZoomRecordingType from './ZoomRecordingType';
/**
 * A Zoom recording file (one view)
 * @author Gabe Abrams
 */
declare type ZoomRecordingFile = ({
    deleted_time?: string;
    download_url: string;
    file_extension: ('MP4' | 'M4A' | 'TXT' | 'VTT' | 'CSV' | 'JSON' | 'JPG');
    meeting_id: string;
    recording_end: string;
    recording_start: string;
    download_access_token?: string;
    password?: string;
    recording_play_passcode?: string;
} & ({
    file_type: (ZoomFileType.ClosedCaptions | ZoomFileType.Timeline);
} | {
    file_type: (ZoomFileType.VideoFile | ZoomFileType.AudioOnlyFile | ZoomFileType.Transcript | ZoomFileType.Chat | ZoomFileType.PollingData | ZoomFileType.RecordingSummary);
    file_size: number;
    status: 'completed';
    id: string;
    recording_type: ZoomRecordingType;
    play_url: string;
}));
export default ZoomRecordingFile;
