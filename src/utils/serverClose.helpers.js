import { pool } from "../db/db.js";
import mongoose from "mongoose";

export const serverClose = async (server) => {
    await pool.end();
    await mongoose.connection.close();
    await server.close();
    process.exit(0);
}