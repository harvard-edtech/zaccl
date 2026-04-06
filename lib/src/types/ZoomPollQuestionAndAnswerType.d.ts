/**
 * Types of questions and answers in a poll
 * @author Yuen Ler Chow
 */
declare enum ZoomPollQuestionAndAnswerType {
    SingleChoice = "SingleChoice",
    MultipleChoice = "MultipleChoice",
    ShortAnswer = "ShortAnswer",
    LongAnswer = "LongAnswer",
    FillInTheBlank = "FillInTheBlank",
    RatingScale = "RatingScale",
    Unknown = "Unknown"
}
export default ZoomPollQuestionAndAnswerType;
