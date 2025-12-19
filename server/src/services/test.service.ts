import db from "../db.js";
import type { ITest } from "../types/test.js";
import { getUserTestsService } from "./userTest.service.js";

export const getTestsService = async (
  userId?: number,
  sort: string = "random",
  search: string = "",
  topic: string = "",
  difficulty: string = "",
  status: string = "",
  page = 1,
  limit = 12
): Promise<{ tests: ITest[]; totalCount: number }> => {
  try {
    const offset = (page - 1) * limit;
    const orderBy = getOrderBy(sort, "ASC");

    const isSearch = Boolean(search);
    const isTopic = Boolean(topic);
    const isDifficulty = Boolean(difficulty);
    const isStatus = Boolean(status);
    let whereClauses: string[] = [];
    let params: any[] = [limit, offset];

    if (isSearch) {
      whereClauses.push(`name ILIKE $${params.length + 1}`);
      params.push(`%${search}%`);
    }

    if (isTopic) {
      whereClauses.push(`topic_id = $${params.length + 1}`);
      params.push(topic);
    }

    if (isDifficulty) {
      whereClauses.push(`difficulty = $${params.length + 1}`);
      params.push(difficulty);
    }

    if (isStatus && userId) {
      if (status === "completed") {
        whereClauses.push(`id IN (SELECT test_id FROM user_tests WHERE user_id = $${params.length + 1})`);
        params.push(userId);
      } else if (status === "not-completed") {
        whereClauses.push(`id NOT IN (SELECT test_id FROM user_tests WHERE user_id = $${params.length + 1})`);
        params.push(userId);
      }
    }

    const whereSQL = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const sqlTests = `
      SELECT * FROM tests
      ${whereSQL}
      ${orderBy}
      LIMIT $1 OFFSET $2
    `;
    const tests = await db.query(sqlTests, params);
    console.log(sqlTests, params);

    const sqlQuestionCount = `
      SELECT test_id, COUNT(*) as count
      FROM questions
      GROUP BY test_id
    `;
    const questionCount = await db.query(sqlQuestionCount);

    let countWhereClauses: string[] = [];
    let countParams: any[] = [];

    if (isSearch) {
      countWhereClauses.push(`name ILIKE $${countParams.length + 1}`);
      countParams.push(`%${search}%`);
    }

    if (isTopic) {
      countWhereClauses.push(`topic_id = $${countParams.length + 1}`);
      countParams.push(topic);
    }
    if (isDifficulty) {
      countWhereClauses.push(`difficulty = $${countParams.length + 1}`);
      countParams.push(difficulty);
    }
    if (isStatus && userId) {
      if (status === "completed") {
        countWhereClauses.push(`id IN (SELECT test_id FROM user_tests WHERE user_id = $${countParams.length + 1})`);
        countParams.push(userId);
      } else if (status === "not-completed") {
        countWhereClauses.push(`id NOT IN (SELECT test_id FROM user_tests WHERE user_id = $${countParams.length + 1})`);
        countParams.push(userId);
      }
    }

    const countWhereSQL = countWhereClauses.length ? `WHERE ${countWhereClauses.join(" AND ")}` : "";
    const sqlTotalCount = `SELECT COUNT(*) FROM tests ${countWhereSQL}`;

    const totalTest = await db.query(sqlTotalCount, countParams);
    const totalCount = Number(totalTest.rows[0].count);

    addCountQuestionsToTests(tests.rows, questionCount.rows);
    await getUserCompletedTestsCount(userId as number, tests.rows);

    return { tests: tests.rows, totalCount };
  } catch (error) {
    throw error;
  }
};

const getOrderBy = (sort: string, order: string) => {
  if (sort === "name") return `ORDER BY name ${order}`;
  if (sort === "date") return `ORDER BY created_at ${order}`;
  if (sort === "asc") return "ORDER BY id ASC";
  if (sort === "desc") return "ORDER BY id DESC";
  return "ORDER BY RANDOM()";
};

const addCountQuestionsToTests = (tests: ITest[], questionCount: any[]) => {
  tests.forEach((test: ITest) => {
    const countObj = questionCount.find((qc) => qc.test_id === test.id);
    test.questionCount = countObj ? countObj.count : 0;
  });
};

const getUserCompletedTestsCount = async (userId: number, tests: ITest[]) => {
  if (!userId) return;

  const userTests = await getUserTestsService(userId);

  if (userTests) {
    tests.forEach((test: ITest) => {
      const userTest = userTests.find((ut) => ut.test_id === test.id);
      if (userTest) test.status = "completed";
    });
  }
};
