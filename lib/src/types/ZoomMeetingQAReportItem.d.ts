/**
 * Meeting Q&A report item
 * @author Gabe Abrams
 */
type ZoomMeetingQAReportItem = {
    user_id: string;
    email: string;
    name: string;
    question_details: {
        answer?: string;
        question: string;
        question_id: string;
        create_time: string;
        question_status: 'default' | 'open' | 'dismissed' | 'answered' | 'deleted';
        answer_details: {
            user_id: string;
            name: string;
            email: string;
            content: string;
            create_time: string;
            type: 'default' | 'host_answered_publicly' | 'host_answered_privately' | 'participant_commented' | 'host_answered';
        }[];
    }[];
};
export default ZoomMeetingQAReportItem;
