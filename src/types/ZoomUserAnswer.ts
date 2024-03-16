/**
 * Users' answers to a Zoom poll question
 * @author Yuen Ler Chow
 */
type ZoomUserAnswer = {
  // The answer submitted by the user
  answer: string,
  // Timestamp when the answer was submitted
  timeSubmitted: number,
  // The name of the user who submitted the answer
  name: string,
  // The email of the user who submitted the answer
  email: string,
}

export default ZoomUserAnswer;
