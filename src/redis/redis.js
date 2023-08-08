import dotenv from "dotenv";

dotenv.config();
import { createClient } from 'redis';
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USER = process.env.REDIS_USER;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;


const client = createClient({
    username: REDIS_USER,
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
});

await client.connect();
/*
await client.set('foo', 'bar');
const value = await client.get('foo');
console.log(value) // returns 'bar'

await client.disconnect();
*/
export default client;
