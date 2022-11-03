// Import shared types
import ZoomMeetingRecordings from './ZoomMeetingRecordings';

/**
 * List of recordings for a user
 * @author Gabe Abrams
 */
type ZoomUserRecordings = {
  // Start date of query
  from: string,
  // End date of query
  to: string,
  // The next page token is used to paginate through large result sets.A next page token will be returned whenever the set of available results exceeds the current page size.The expiration period for this token is 15 minutes.
  next_page_token: string,
  // The number of pages returned for the request made.
  page_count: number,
  // The number of records returned within a single API call. (min 30, max 300)
  page_size: number,
  // The number of all records available across pages.
  total_records: number,
  // List of meetings
  meetings: ZoomMeetingRecordings[],
};

export default ZoomUserRecordings;
