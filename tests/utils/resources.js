import app from "../../src/app.js";
import { pool } from "../../src/db/db.js";
import mongoose from "mongoose";

let appInstance = null;
let poolInstance = null;
let mongooseInstance = null;

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

const resources = {
    getAppInstance,
    getPoolInstance,
    getMongooseInstance
};

export default resources;