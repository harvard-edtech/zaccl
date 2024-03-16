import ZoomUsersAnswersToQuestion from "./ZoomUsersAnswersToQuestion";

/**
 * One poll occurrence of a poll that happened in a past occurrence of a
 *   Zoom meeting
 * @author Gabe Abrams
 */
type ZoomPollOccurrence = {
  // The poll id
  pollId: string,
  // Timestamp for when the poll occurred (ms since epoch for first response)
  timestamp: number,
  // List of questions
  questions: ZoomUsersAnswersToQuestion[],
};

export default ZoomPollOccurrence;
