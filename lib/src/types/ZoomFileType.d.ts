/**
 * Type of a Zoom file
 * @author Gabe Abrams
 */
declare enum ZoomFileType {
    VideoFile = "MP4",
    AudioOnlyFile = "M4A",
    Timeline = "TIMELINE",
    Transcript = "TRANSCRIPT",
    Chat = "CHAT",
    ClosedCaptions = "CC",
    PollingData = "CSV",
    RecordingSummary = "SUMMARY"
}
export default ZoomFileType;
