import ECatCloudRecording from '../endpoints/ECatCloudRecording';
import ECatGroup from '../endpoints/ECatGroup';
import ECatMeeting from '../endpoints/ECatMeeting';
import ECatUser from '../endpoints/ECatUser';
import ECatWebinar from '../endpoints/ECatWebinar';
/**
 * API structure type
 * @author Gabe Abrams
 */
interface ZoomAPI {
    cloudRecording: ECatCloudRecording;
    meeting: ECatMeeting;
    user: ECatUser;
    webinar: ECatWebinar;
    group: ECatGroup;
}
export default ZoomAPI;
