/**
 * Zoom Webinar Q&A Report
 * @author Gabe Abrams
 */
type ZoomWebinarQAReport = {
  // Webinar ID in long format
  id: number,
  // Array of webinar question objects
  questions: Array<{
    // User ID of the user who asked the question
    user_id: string,
    // Participant's email
    email: string,
    // Participant's display name
    name: string,
    // Array of questions from the user
    question_details: Array<{
      // The given answer (deprecated)
      answer?: string,
      // Asked question
      question: string,
      // Question UUID
      question_id: string,
      // Question creation time
      create_time: string,
      // Question status
      question_status: 'default' | 'open' | 'dismissed' | 'answered' | 'deleted',
      // Array of answers from user
      answer_details: Array<{
        // User ID of the user who answered the question
        user_id: string,
        // User display name
        name: string,
        // Participant's email
        email: string,
        // The answer or comment content
        content: string,
        // Content submission time
        create_time: string,
        // Type of answer
        type: 'default' | 'host_answered_publicly' | 'host_answered_privately' | 'participant_commented' | 'host_answered',
      }>,
    }>,
  }>,
  // Webinar start time
  start_time: string,
  // Webinar UUID
  uuid: string,
};

export default ZoomWebinarQAReport;
