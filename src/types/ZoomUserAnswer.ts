
/**
 * A user's response to a Zoom poll question
 * @author Yuen Ler Chow
 */
type ZoomUserAnswer = {
  // The name of the person who submitted the response
  userFullName: string,
  // The email of the person who submitted the response
  userEmail: string,
  // The response/answer the user chose (array of length 1 if single choice,
  // array of length >= 1 if multiple choice)
  answer: string[],
  // Timestamp of when the user submitted their response (ms since epoch)
  timestamp: number,
}

export default ZoomUserAnswer;
