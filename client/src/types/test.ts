export interface ITest {
  id: number;
  name: string;
  description: string;
  status: status;
  difficulty: difficulty;
  questionCount: number;
}

type difficulty = "easy" | "medium" | "hard";
type status = "not completed" | "completed";
