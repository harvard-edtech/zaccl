import ZoomRecordingFile from './ZoomRecordingFile';

/**
 * A single recording in an account
 * @author Gabe Abrams
 */
type ZoomRecordingInAccount = {
  // The meeting's scheduled duration
  duration: number,
  // The meeting host's user ID
  host_id: string,
  // The meeting's ID
  id: number,
  // The total number of recordings retrieved from the account
  recording_count: number,
  // The information about the recording files
  recording_files: ZoomRecordingFile[],
  // The date and time when the meeting started
  start_time: string,
  // The meeting's topic
  topic: string,
  // The total size of the recording file, in bytes
  total_size: number,
  // The recording's associated type of meeting or webinar
  type: number,
  // The meeting's universally unique ID
  uuid: string,
  // Recording zone used in the Zoom Node Platform
  rc_zone?: string,
  // The unique ID for the hybrid recorder or recording connector
  instance_id?: string,
  // The name of the Zoom Node Service
  service_name?: string,
  // NFS address
  external_storage_addr?: string,
};

export default ZoomRecordingInAccount;
