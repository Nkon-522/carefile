import pg from "pg";
const {Pool} = pg;

pg.types.setTypeParser(20, parseInt);
pg.types.setTypeParser(1700, parseFloat);
pg.types.setTypeParser(1082, function(stringValue) {
    return stringValue;  
});

const DB = process.env.DB;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

export const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB,
    port: DB_PORT,
});
