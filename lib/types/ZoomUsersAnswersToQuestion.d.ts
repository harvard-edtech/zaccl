import ZoomUserAnswer from './ZoomUserAnswer';
/**
 * List of users' answers to a Zoom poll question
 * @author Yuen Ler Chow
 */
type ZoomUsersAnswersToQuestion = {
    prompt: string;
    responses: ZoomUserAnswer[];
};
export default ZoomUsersAnswersToQuestion;
