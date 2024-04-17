import ZoomUsersAnswersToQuestion from "./ZoomUsersAnswersToQuestion";
/**
 * One poll occurrence of a poll that happened in a past occurrence of a
 *   Zoom meeting
 * @author Gabe Abrams
 */
type ZoomPollOccurrence = {
    pollId: string;
    timestamp: number;
    questions: ZoomUsersAnswersToQuestion[];
};
export default ZoomPollOccurrence;
