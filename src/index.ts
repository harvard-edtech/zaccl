// Import shared types
import ZoomAPI from './types/ZoomAPI';

// Import shared helpers
import genVisitEndpoint from './shared/helpers/genVisitEndpoint';

// Import endpoint categories
import ECatCloudRecording from './endpoints/ECatCloudRecording';
import ECatMeeting from './endpoints/ECatMeeting';
import ECatUser from './endpoints/ECatUser';
import ECatWebinar from './endpoints/ECatWebinar';
import ECatGroup from './endpoints/ECatGroup';

// Import shared types
import ZoomAPIConfig from './types/ZoomAPIConfig';
import InitPack from './shared/types/InitPack';
import ZACCLError from './shared/classes/ZACCLError';
import ErrorCode from './shared/types/ErrorCode';
import ZoomAPIConfigType from './types/ZoomAPIConfigType';

// Import all Zoom types
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
import ZoomMeetingActivitiesReportItem from './types/ZoomMeetingActivitiesReportItem';
import ZoomParticipantInReport from './types/ZoomParticipantInReport';
import ZoomMeetingQAReportItem from './types/ZoomMeetingQAReportItem';
import ZoomRecordingInAccount from './types/ZoomRecordingInAccount';

// Import shared constants
import DEFAULT_ZOOM_HOSTNAME from './shared/constants/DEFAULT_ZOOM_HOSTNAME';

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
const initZoomAPI = (
  config: {
    key?: string,
    secret?: string,
    token?: string,
    zoomHost?: string,
    clientId?: string,
    clientSecret?: string,
    accountId?: string,
  } = {},
) => {
  // Create a new API instance
  const api: ZoomAPI = ({} as ZoomAPI);

  // Determine Zoom host
  const zoomHost = (
    config.zoomHost
    ?? process.env.ZOOM_HOST
    ?? DEFAULT_ZOOM_HOSTNAME
  );

  // Create a fully filled-in zoomApiConfig
  let zoomAPIConfig: ZoomAPIConfig;
  if (
    (config.key || process.env.ZOOM_KEY)
    && (config.secret || process.env.ZOOM_SECRET)
  ) {
    // Find key
    const key = (
      config.key
      ?? process.env.ZOOM_KEY
    );
    if (!key) {
      throw new ZACCLError({
        message: 'Zoom API key not included',
        code: ErrorCode.CredentialsNotIncluded,
      }); 
    }

    // Find secret
    const secret = (
      config.secret
      ?? process.env.ZOOM_SECRET
    );
    if (!secret) {
      throw new ZACCLError({
        message: 'Zoom API secret not included',
        code: ErrorCode.CredentialsNotIncluded,
      }); 
    }

    // Key and secret provided
    zoomAPIConfig = {
      type: ZoomAPIConfigType.JWT,
      zoomHost,
      key,
      secret,
    };
  } else if (config.token || process.env.ZOOM_TOKEN) {
    // Find token
    const token = (
      config.token
      ?? process.env.ZOOM_TOKEN
    );
    if (!token) {
      throw new ZACCLError({
        message: 'Zoom API token not included',
        code: ErrorCode.CredentialsNotIncluded,
      }); 
    }

    // Token provided
    zoomAPIConfig = {
      type: ZoomAPIConfigType.Token,
      zoomHost,
      token,
    };
  } else if (
    (config.clientId || process.env.ZOOM_CLIENT_ID)
    && (config.clientSecret || process.env.ZOOM_CLIENT_SECRET)
    && (config.accountId || process.env.ZOOM_ACCOUNT_ID)
  ) {
    // Find clientId
    const clientId = (
      config.clientId
      ?? process.env.ZOOM_CLIENT_ID
    );
    if (!clientId) {
      throw new ZACCLError({
        message: 'Zoom OAuth Client ID not included',
        code: ErrorCode.CredentialsNotIncluded,
      }); 
    }
    
    // Find clientSecret
    const clientSecret = (
      config.clientSecret
      ?? process.env.ZOOM_CLIENT_SECRET
    );
    if (!clientSecret) {
      throw new ZACCLError({
        message: 'Zoom OAuth Client Secret not included',
        code: ErrorCode.CredentialsNotIncluded,
      }); 
    }

    // Find accountId
    const accountId = (
      config.accountId
      ?? process.env.ZOOM_ACCOUNT_ID
    );
    if (!accountId) {
      throw new ZACCLError({
        message: 'Zoom OAuth Account ID not included',
        code: ErrorCode.CredentialsNotIncluded,
      }); 
    }

    // OAuth credentials provided
    zoomAPIConfig = {
      type: ZoomAPIConfigType.OAuth,
      zoomHost,
      clientId,
      clientSecret,
      accountId,
    };
  } else {
    throw new ZACCLError({
      message: 'Missing Zoom credentials. Either include key+secret or include token or include clientId+clientSecret+accountId via initialization function or via environment variables. See README.',
      code: ErrorCode.CredentialsNotIncluded,
    });
  }

  // Generate a visitEndpoint function
  const visitEndpoint = genVisitEndpoint(zoomAPIConfig);

  // Create a pack of info that's used to initialize each endpoint category
  const initPack: InitPack = {
    visitEndpoint,
    api,
  };

  // Initialize and add endpoint categories
  api.cloudRecording = new ECatCloudRecording(initPack);
  api.meeting = new ECatMeeting(initPack);
  api.user = new ECatUser(initPack);
  api.webinar = new ECatWebinar(initPack);
  api.group = new ECatGroup(initPack);

  // Return api instance
  return api;  
};

export default initZoomAPI;

/*----------------------------------------*/
/* ---------------- Types --------------- */
/*----------------------------------------*/

export {
  ZoomPanelist,
  ZoomPollInfo,
  ZoomPollOccurrence,
  ZoomFileType,
  ZoomPollQuestion,
  ZoomPollQuestionAndAnswerType,
  ZoomPollStatus,
  ZoomLoginMethod,
  ZoomPollType,
  ZoomRecordingFile,
  ZoomRecordingType,
  ZoomMeetingIdAndStartTime,
  ZoomRecurrenceInfo,
  ZoomMeetingOrWebinarType,
  ZoomMeetingRecordings,
  ZoomUserAnswer,
  ZoomMeetingTranscript,
  ZoomUsersAnswersToQuestion,
  ZoomMeetingType,
  ZoomWebinar,
  ZoomPastMeetingParticipant,
  ZoomMeetingActivitiesReportItem,
  ZoomParticipantInReport,
  ZoomMeetingQAReportItem,
  ZoomRecordingInAccount,
};
