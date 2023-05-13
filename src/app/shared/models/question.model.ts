export class QuestionModel {
  questionId!: string;
  question!: string;
  optionA!: string;
  optionB!: string;
  optionC!: string;
  optionD!: string;
  correctAnswer!: string;
  explanation!: string;
  selectedAnswer?: string;
  incorrect?: boolean;
  skipped?: boolean;
  bookmarked?: boolean;
  [key: string]: any;
}
