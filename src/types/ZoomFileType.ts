/**
 * Type of a Zoom file
 * @author Gabe Abrams
 */
enum ZoomFileType {
  // Video file of the recording.
  VideoFile = 'MP4',
  // Audio-only file of the recording.
  AudioOnlyFile = 'M4A',
  // Timestamp file of the recording in JSON file format. To get a timeline
  // file, the "Add a timestamp to the recording" setting must be enabled in
  // the recording settings. The time will display in the host's timezone,
  // set on their Zoom profile
  Timeline = 'TIMELINE',
  // Transcription file of the recording in VTT format.
  Transcript = 'TRANSCRIPT',
  // A TXT file containing in-meeting chat messages that were sent during
  // the meeting.
  Chat = 'CHAT',
  // File containing closed captions of the recording in VTT file format.
  ClosedCaptions = 'CC',
  // File containing polling data in csv format.
  PollingData = 'CSV',
  // Summary file of the recording in JSON format
  RecordingSummary = 'SUMMARY',
}

export default ZoomFileType;
