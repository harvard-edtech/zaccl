// Import shared types
import ZoomMeetingOrWebinarType from './ZoomMeetingOrWebinarType';
import ZoomRecordingFile from './ZoomRecordingFIle';

/**
 * Object containing Zoom meeting recordings
 * @author Gabe Abrams
 */
type ZoomMeetingRecordings = {
  // Unique Identifier of the user account.
  account_id: string,
  // Meeting duration.
  duration: number,
  // ID of the user set as host of meeting.
  host_id: string,
  // Meeting ID - also known as the meeting number.
  id: number,
  // Number of recording files returned in the response of this API call.
  // This includes the recording_files and participant_audio_files files.
  recording_count: number,
  // The time at which the meeting started. ISO 8601
  start_time: string,
  // Meeting topic.
  topic: string,
  // The total file size of the recording. This includes the recording_files
  // and participant_audio_files files.
  total_size: number,
  // The recording's associated type of meeting or webinar:
  type: ZoomMeetingOrWebinarType,
  // Unique Meeting Identifier.
  // Each instance of the meeting will have its own UUID.
  uuid: string,
  // Recording file List
  recording_files?: ZoomRecordingFile[],
};

export default ZoomMeetingRecordings;
