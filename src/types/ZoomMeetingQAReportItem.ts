/**
 * Meeting Q&A report item
 * @author Gabe Abrams
 */
type ZoomMeetingQAReportItem = {
  // The user ID of the person who asked the question
  user_id: string,
  // The email address of the person who asked the question
  email: string,
  // The display name of the person who asked the question
  name: string,
  // Array of question details with answers and metadata
  question_details: {
    // The deprecated answer field (use answer_details instead)
    answer?: string,
    // The text of the question asked
    question: string,
    // Unique identifier for the question
    question_id: string,
    // Timestamp when the question was created
    create_time: string,
    // Current status of the question
    question_status: 'default' | 'open' | 'dismissed' | 'answered' | 'deleted',
    // Array of answers provided to this question
    answer_details: {
      // The user ID of the person who provided the answer
      user_id: string,
      // Display name of the person who answered
      name: string,
      // Email of the person who answered
      email: string,
      // The content of the answer or comment
      content: string,
      // Timestamp when the answer was submitted
      create_time: string,
      // Type of answer (host answer, participant comment, etc.)
      type: 'default' | 'host_answered_publicly' | 'host_answered_privately' | 'participant_commented' | 'host_answered',
    }[],
  }[];
};

export default ZoomMeetingQAReportItem;
