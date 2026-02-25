/**
 * A webinar poll report
 * @author Gabe Abrams
 */
type ZoomWebinarPollReport = {
  // The webinar ID
  id: number,
  // Information about the webinar questions
  questions: Array<{
    // The participant's email address
    email: string,
    // The participant's display name
    name: string,
    // The participant's first name
    first_name: string,
    // The participant's last name
    last_name: string,
    // Information about the user's questions and answers
    question_details: Array<{
      // The user's given answer
      answer: string,
      // The date and time at which the user answered the poll question
      date_time: string,
      // The poll's ID
      polling_id: string,
      // The poll question
      question: string,
    }>,
  }>,
  // The webinar's start time
  start_time: string,
  // The webinar's universally unique identifier (UUID)
  uuid: string,
};

export default ZoomWebinarPollReport;
