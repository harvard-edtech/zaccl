// Import shared types
import QuestionAndAnswerType from './ZoomPollQuestionAndAnswerType';

/**
 * One question in a Zoom poll
 * @author Yuen Ler Chow
 */
type ZoomPollQuestion = (
  {
    // If true, users must answer this question
    answerRequired: boolean,
    // Available answers
    answers: string[],
    // Name of the question
    name: string,
    // Correct answers
    rightAnswers: string[],
  }
  & (
    // Text answer
    | {
      // Type of question
      questionAnswerType: (
        | QuestionAndAnswerType.LongAnswer
        | QuestionAndAnswerType.ShortAnswer
      ),
      // Max length (in chars) that a participant can submit
      answerMaxCharacters: number,
      // Min length (in chars) that a participant can submit
      answerMinCharacters: number,
    }
    // Rating scale
    | {
      // Type of question
      questionAnswerType: QuestionAndAnswerType.RatingScale
      // Label for the max value
      ratingMaxLabel: string,
      // Max value
      ratingMaxValue: number,
      // Label for the min value
      ratingMinLabel: string,
      // Min value
      ratingMinValue: number,
    }
    // Fill in the blank
    | {
      // Type of question
      questionAnswerType: QuestionAndAnswerType.FillInTheBlank,
      // If true, fill in the blank is case sensitive
      caseSensitive: boolean,
    }
    // Single choice and multiple choice
    | {
      // Type of question
      questionAnswerType: (
        | QuestionAndAnswerType.SingleChoice
        | QuestionAndAnswerType.MultipleChoice
      ),
      // If true, show as dropdown
      showAsDropdown: boolean,
    }
    // Unknown/Other Types
    | {
      // Type of question
      questionAnswerType: QuestionAndAnswerType.Unknown,
    }
  )
);

export default ZoomPollQuestion;
