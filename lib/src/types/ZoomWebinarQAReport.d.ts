/**
 * Zoom Webinar Q&A Report
 * @author Gabe Abrams
 */
type ZoomWebinarQAReport = {
    id: number;
    questions: Array<{
        user_id: string;
        email: string;
        name: string;
        question_details: Array<{
            answer?: string;
            question: string;
            question_id: string;
            create_time: string;
            question_status: 'default' | 'open' | 'dismissed' | 'answered' | 'deleted';
            answer_details: Array<{
                user_id: string;
                name: string;
                email: string;
                content: string;
                create_time: string;
                type: 'default' | 'host_answered_publicly' | 'host_answered_privately' | 'participant_commented' | 'host_answered';
            }>;
        }>;
    }>;
    start_time: string;
    uuid: string;
};
export default ZoomWebinarQAReport;
