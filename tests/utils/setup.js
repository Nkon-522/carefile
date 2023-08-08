import resources from "./resources.js"

beforeAll(async () => {
    resources.getAppInstance();
    resources.getPoolInstance();
    resources.getMongooseInstance();
    resources.getRedisInstance();
});

afterAll(async () => {
    if (resources.getPoolInstance() !== null) {
        await resources.getPoolInstance().end();
    }
    if (resources.getMongooseInstance() !== null) {
        await resources.getMongooseInstance().connection.close();
    }
    if (resources.getRedisInstance() !== null) {
        await resources.getRedisInstance().disconnect();
    }
});