import QuestionAndAnswerType from './QuestionAndAnswerType';

enum PollStatus {
  NotStart = 'NotStart',
  Started = 'Started',
  Ended = 'Ended',
  Sharing = 'Sharing'
}

enum PollType {
  Poll = 'Poll',
  AdvancedPoll = 'AdvancedPoll',
  Quiz = 'Quiz',
}

type CommonQuestionFields = {
  answerRequired: boolean;
  answers: string[];
  name: string;
  rightAnswers: string[];
};


/**
 * The information about a poll that happened in a Zoom meeting.
 * @author Yuen Ler Chow
 */
type PollInfo = {
  pollId: string;
  pollStatus: PollStatus;
  anonymous: boolean;
  pollType: PollType;
  questions: (
    | {
      questionAnswerType: QuestionAndAnswerType.LongAnswer | QuestionAndAnswerType.ShortAnswer;
      answerMaxCharacter: number;
      answerMinCharacter: number;
    } & CommonQuestionFields
    | {
      questionAnswerType: QuestionAndAnswerType.RatingScale
      ratingMaxLabel: string;
      ratingMaxValue: number;
      ratingMinLabel: string;
      ratingMinValue: number;
    } & CommonQuestionFields
    | {
      questionAnswerType: QuestionAndAnswerType.RankOrder | QuestionAndAnswerType.Matching;
      prompts: {
        promptQuestion: string;
        promptRightAnswers: string[];
      }[];
    } & CommonQuestionFields
    | {
      questionAnswerType: QuestionAndAnswerType.FillInTheBlank;
      caseSensitive: boolean;
    } & CommonQuestionFields
    | {
      questionAnswerType: QuestionAndAnswerType.Single | QuestionAndAnswerType.Multiple;
      showAsDropdown: boolean;
    } & CommonQuestionFields
  )[];
  title: string;
};

export default PollInfo;
