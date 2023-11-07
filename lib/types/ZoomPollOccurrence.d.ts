/**
 * One poll occurrence of a poll that happened in a past occurrence of a
 *   Zoom meeting
 * @author Gabe Abrams
 */
type ZoomPollOccurrence = {
    pollId: string;
    timestamp: number;
    questions: {
        prompt: string;
        responses: {
            userFullName: string;
            userEmail: string;
            answer: string;
            timestamp: number;
        }[];
    }[];
};
export default ZoomPollOccurrence;
