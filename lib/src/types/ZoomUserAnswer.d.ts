/**
 * A user's response to a Zoom poll question
 * @author Yuen Ler Chow
 */
type ZoomUserAnswer = {
    userFullName: string;
    userEmail: string;
    answer: string[];
    timestamp: number;
};
export default ZoomUserAnswer;
