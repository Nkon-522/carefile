import { pool } from "../db/db.js";
import mongoose from "mongoose";
import client from "../redis/redis.js";

export const serverClose = async (server) => {
    await pool.end();
    await mongoose.connection.close();
    await client.disconnect();
    await server.close();
    process.exit(0);
}