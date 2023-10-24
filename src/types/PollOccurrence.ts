/**
 * One poll occurrence of a poll that happened in a past occurrence of a
 *   Zoom meeting
 * @author Gabe Abrams
 */
type PollOccurrence = {
  // The poll id
  pollId: string,
  // Timestamp for when the poll occurred (ms since epoch for first response)
  timestamp: number,
  // List of questions
  questions: {
    // The prompt for the question
    prompt: string,
    // List of responses to the question
    responses: {
      // The name of the person who submitted the response
      userFullName: string,
      // The email of the person who submitted the response
      userEmail: string,
      // The response/answer the user chose
      answer: string,
      // Timestamp of when the user submitted their response (ms since epoch)
      timestamp: number,
    }[],
  }[],
};

export default PollOccurrence;
