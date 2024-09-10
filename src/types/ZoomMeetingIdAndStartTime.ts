/**
 * The start time of a Zoom meeting and its meeting UUID.
 * @author Yuen Ler Chow
 */
type ZoomMeetingIdAndStartTime = {
  // Start time of meeting. ISO 8601
  start_time: string,
  // The meeting UUID
  uuid: string,
};

export default ZoomMeetingIdAndStartTime;
