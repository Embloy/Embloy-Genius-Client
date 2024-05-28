export type QuestionType =
  | "yes_no"
  | "link"
  | "single_choice"
  | "text"
  | "multiple_choice";
export type Question = {
  question: string;
  question_type: QuestionType;
  required: boolean;
  options?: string[];
};

export type InputData = Question[];
