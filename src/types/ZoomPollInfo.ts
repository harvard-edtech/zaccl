import PollQuestion from './ZoomPollQuestion';
import PollStatus from './ZoomPollStatus';
import PollType from './ZoomPollType';

/**
 * The information about a poll that happened in a Zoom meeting.
 * @author Yuen Ler Chow
 */
type ZoomPollInfo = {
  // Id of the poll
  pollId: string,
  // Current status of the poll
  pollStatus: PollStatus,
  // If true, poll is anonymous
  anonymous: boolean,
  // Type of poll
  pollType: PollType,
  // List of all questions
  questions: PollQuestion[],
  // Title of the poll
  title: string,
};

export default ZoomPollInfo;
