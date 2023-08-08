import app from "../../src/app.js";
import { pool } from "../../src/db/db.js";
import mongoose from "mongoose";
import client from "../../src/redis/redis.js"

let appInstance = null;
let poolInstance = null;
let mongooseInstance = null;
let redisInstance = null;

const getAppInstance = () => {
    if (appInstance === null) {
        console.log("CREATING APP");
        appInstance = app;
    }
    return appInstance;
};

const getPoolInstance = () => {
    if (poolInstance === null) {
        poolInstance = pool;
    }
    return poolInstance;
};

const getMongooseInstance = () => {
    if (mongooseInstance === null) {
        mongooseInstance = mongoose;
    }
    return mongooseInstance;
};

const getRedisInstance = () => {
    if (redisInstance === null) {
        redisInstance = client;
    }
    return redisInstance;
};

const resources = {
    getAppInstance,
    getPoolInstance,
    getMongooseInstance,
    getRedisInstance
};

export default resources;