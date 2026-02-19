import ZoomAPI from './types/ZoomAPI';
import ZoomPanelist from './types/ZoomPanelist';
import ZoomPollInfo from './types/ZoomPollInfo';
import ZoomPollOccurrence from './types/ZoomPollOccurrence';
import ZoomFileType from './types/ZoomFileType';
import ZoomPollQuestion from './types/ZoomPollQuestion';
import ZoomPollQuestionAndAnswerType from './types/ZoomPollQuestionAndAnswerType';
import ZoomPollStatus from './types/ZoomPollStatus';
import ZoomLoginMethod from './types/ZoomLoginMethod';
import ZoomPollType from './types/ZoomPollType';
import ZoomRecordingFile from './types/ZoomRecordingFile';
import ZoomRecordingType from './types/ZoomRecordingType';
import ZoomMeetingIdAndStartTime from './types/ZoomMeetingIdAndStartTime';
import ZoomRecurrenceInfo from './types/ZoomRecurrenceInfo';
import ZoomMeetingOrWebinarType from './types/ZoomMeetingOrWebinarType';
import ZoomMeetingRecordings from './types/ZoomMeetingRecordings';
import ZoomUserAnswer from './types/ZoomUserAnswer';
import ZoomMeetingTranscript from './types/ZoomMeetingTranscript';
import ZoomUsersAnswersToQuestion from './types/ZoomUsersAnswersToQuestion';
import ZoomMeetingType from './types/ZoomMeetingType';
import ZoomWebinar from './types/ZoomWebinar';
import ZoomPastMeetingParticipant from './types/ZoomPastMeetingParticipant';
/**
 * Initialize Zoom api
 * @author Gabe Abrams
 * @param [config] object containing all arguments
 * @param [config.zoomHost=env.ZOOM_HOST or api.zoom.us] the hostname of Zoom or
 *   a gateway that leads to Zoom (i.e. Apigee)
 * @param [config.key=env.ZOOM_KEY] for JWT-style auth: the Zoom API key to use
 *   to generate credentials. If included, secret must also be included
 * @param [config.secret=env.ZOOM_SECRET] for JWT-style auth: the Zoom API
 *   secret to use to generate credentials. If included, key must also
 *   be included
 * @param [config.token=env.ZOOM_TOKEN] for Harvard apigee auth or manually
 *   generated token auth: the token to use
 *   for request authentication. If host points to Zoom, this token is used
 *   instead of generating a token with the key and secret. If host points to
 *   the Harvard Zoom API gateway, the token is included in the X-Api-Key
 *   header
 * @param [config.clientId=env.ZOOM_CLIENT_ID] for server-to-server
 *   oauth auth: Zoom OAuth Client ID
 * @param [config.clientSecret=env.ZOOM_CLIENT_SECRET] for server-to-server
 *   oauth auth: Zoom OAuth Client Secret
 * @param [config.accountId=env.ZOOM_ACCOUNT_ID] for server-to-server
 *   oauth auth: Zoom OAuth Account ID
 */
declare const initZoomAPI: (config?: {
    key?: string;
    secret?: string;
    token?: string;
    zoomHost?: string;
    clientId?: string;
    clientSecret?: string;
    accountId?: string;
}) => ZoomAPI;
export default initZoomAPI;
export { ZoomPanelist, ZoomPollInfo, ZoomPollOccurrence, ZoomFileType, ZoomPollQuestion, ZoomPollQuestionAndAnswerType, ZoomPollStatus, ZoomLoginMethod, ZoomPollType, ZoomRecordingFile, ZoomRecordingType, ZoomMeetingIdAndStartTime, ZoomRecurrenceInfo, ZoomMeetingOrWebinarType, ZoomMeetingRecordings, ZoomUserAnswer, ZoomMeetingTranscript, ZoomUsersAnswersToQuestion, ZoomMeetingType, ZoomWebinar, ZoomPastMeetingParticipant, };
