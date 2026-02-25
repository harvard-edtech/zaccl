/**
 * Single entry in a Zoom meeting activities report
 * @author Gabe Abrams
 */
type ZoomMeetingActivitiesReportItem = {
  // The meeting number
  meeting_number: string,
  // The operator's activity time
  activity_time: string,
  // The operator's display name
  operator: string,
  // The operator's email
  operator_email: string,
  // The operator's activity category
  activity_category: (
    | 'Meeting created'
    | 'Meeting started'
    | 'User joined'
    | 'User left'
    | 'Remote control'
    | 'In-meeting chat'
    | 'Meeting ended'
  ),
  // The operator's activity detail
  activity_detail: string,
};

export default ZoomMeetingActivitiesReportItem;
