export interface ITest {
  id: number;
  name: string;
  description: string;
  topic_id: number;
  difficulty: difficulty;
  created_at: string;
  status: status;
  questionCount: number;
}

type difficulty = "easy" | "medium" | "hard";
type status = "available" | "in_progress" | "completed";
