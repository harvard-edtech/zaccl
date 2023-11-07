/**
 * Types of questions and answers in a poll
 * @author Yuen Ler Chow
 */
enum ZoomPollQuestionAndAnswerType {
  // Single choice
  SingleChoice = 'SingleChoice',
  // Multiple choice
  MultipleChoice = 'MultipleChoice',
  // Short answer
  ShortAnswer = 'ShortAnswer',
  // Long answer
  LongAnswer = 'LongAnswer',
  // Fill in the blank
  FillInTheBlank = 'FillInTheBlank',
  // Rating scale
  RatingScale = 'RatingScale',
  // Unknown/Other types
  Unknown = 'Unknown',
}

export default ZoomPollQuestionAndAnswerType;
