export interface QuestionModel {
  selectedAnswer?: string;
  questionId?: string;
  question?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  answer?: string;
  explanation?: string;
  [key: string]: any;
  incorrect?: boolean;

}
