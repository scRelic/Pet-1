export interface IQuestion {
  id: number;
  topic_id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
  created_at: string;
  test_id: number;
}
