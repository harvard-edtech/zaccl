import PollQuestion from './ZoomPollQuestion';
import PollStatus from './ZoomPollStatus';
import PollType from './ZoomPollType';
/**
 * The information about a poll that happened in a Zoom meeting.
 * @author Yuen Ler Chow
 */
type ZoomPollInfo = {
    pollId: string;
    pollStatus: PollStatus;
    anonymous: boolean;
    pollType: PollType;
    questions: PollQuestion[];
    title: string;
};
export default ZoomPollInfo;
