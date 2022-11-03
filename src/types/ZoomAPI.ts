import ECatCloudRecording from '../endpoints/ECatCloudRecording';
import ECatMeeting from '../endpoints/ECatMeeting';
import ECatUser from '../endpoints/ECatUser';
import ECatWebinar from '../endpoints/ECatWebinar';

/**
 * API structure type
 * @author Gabe Abrams
 */
interface ZoomAPI {
  cloudRecording: ECatCloudRecording,
  meeting: ECatMeeting,
  user: ECatUser,
  webinar: ECatWebinar,
};

export default ZoomAPI;
