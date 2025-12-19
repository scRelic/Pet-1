import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: Number(process.env.DB_PORT) || 5432,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
