/**
 * Single entry in a Zoom meeting activities report
 * @author Gabe Abrams
 */
type ZoomMeetingActivitiesReportItem = {
    meeting_number: string;
    activity_time: string;
    operator: string;
    operator_email: string;
    activity_category: ('Meeting created' | 'Meeting started' | 'User joined' | 'User left' | 'Remote control' | 'In-meeting chat' | 'Meeting ended');
    activity_detail: string;
};
export default ZoomMeetingActivitiesReportItem;
