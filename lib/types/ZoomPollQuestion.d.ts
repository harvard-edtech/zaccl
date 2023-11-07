import QuestionAndAnswerType from './ZoomPollQuestionAndAnswerType';
/**
 * One question in a Zoom poll
 * @author Yuen Ler Chow
 */
type ZoomPollQuestion = ({
    answerRequired: boolean;
    answers: string[];
    name: string;
    rightAnswers: string[];
} & ({
    questionAnswerType: (QuestionAndAnswerType.LongAnswer | QuestionAndAnswerType.ShortAnswer);
    answerMaxCharacters: number;
    answerMinCharacters: number;
} | {
    questionAnswerType: QuestionAndAnswerType.RatingScale;
    ratingMaxLabel: string;
    ratingMaxValue: number;
    ratingMinLabel: string;
    ratingMinValue: number;
} | {
    questionAnswerType: QuestionAndAnswerType.FillInTheBlank;
    caseSensitive: boolean;
} | {
    questionAnswerType: (QuestionAndAnswerType.SingleChoice | QuestionAndAnswerType.MultipleChoice);
    showAsDropdown: boolean;
} | {
    questionAnswerType: QuestionAndAnswerType.Unknown;
}));
export default ZoomPollQuestion;
