import db from "../db.js";

interface IUserTestData {
  user_id: number;
  test_id: number;
  score: number;
  total_questions: number;
}

export const getUserTestsService = async (user_id: number) => {
  const result = await db.query(`SELECT * FROM "user_tests" WHERE "user_id" = $1`, [user_id]);

  return result.rows;
};

export const addResultUserTestService = async (userTestData: IUserTestData) => {
  const { user_id, test_id, score, total_questions } = userTestData;

  const result = await db.query(`INSERT INTO "user_tests" ("user_id", "test_id", "score", "total_questions") VALUES ($1, $2, $3, $4) `, [
    user_id,
    test_id,
    score,
    total_questions,
  ]);
  return result.rows[0];
};

export const getUserTestsCountService = async (user_id: number): Promise<number> => {
  const result = await db.query("SELECT COUNT(*) FROM user_tests WHERE user_id = $1", [user_id]);
  return Number(result.rows[0].count);
};

export const getUserTestsPaginatedService = async (user_id: number, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const result = await db.query(
    `SELECT
       ut.*,
       t.id AS test_id,
       t.name,
       t.description
     FROM "user_tests" ut
     JOIN "tests" t ON ut.test_id = t.id
     WHERE ut.user_id = $1
     ORDER BY ut.completed_at DESC
     LIMIT $2 OFFSET $3`,
    [user_id, limit, offset]
  );
  const totalCountResult = await db.query(`SELECT COUNT(*) FROM "user_tests" WHERE "user_id" = $1`, [user_id]);

  return {
    tests: result.rows,
    totalCount: Number(totalCountResult.rows[0].count),
  };
};
