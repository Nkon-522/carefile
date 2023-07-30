import { pool } from "../db/db.js";

export const queryExecution = async (queryString, queryParams) => {
    return await pool.query(queryString, queryParams);
}