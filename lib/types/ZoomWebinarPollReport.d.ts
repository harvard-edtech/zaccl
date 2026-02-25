/**
 * A webinar poll report
 * @author Gabe Abrams
 */
type ZoomWebinarPollReport = {
    id: number;
    questions: Array<{
        email: string;
        name: string;
        first_name: string;
        last_name: string;
        question_details: Array<{
            answer: string;
            date_time: string;
            polling_id: string;
            question: string;
        }>;
    }>;
    start_time: string;
    uuid: string;
};
export default ZoomWebinarPollReport;
