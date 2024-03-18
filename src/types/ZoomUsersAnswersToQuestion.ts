import ZoomUserAnswer from './ZoomUserAnswer';

/**
 * List of users' answers to a Zoom poll question
 * @author Yuen Ler Chow
 */
type ZoomUsersAnswersToQuestion = {
  // The prompt for the question
  prompt: string,
  // List of responses to the question
  responses: ZoomUserAnswer[],
};

export default ZoomUsersAnswersToQuestion;

