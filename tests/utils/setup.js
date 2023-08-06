import resources from "./resources.js"

beforeAll(async () => {
    resources.getAppInstance();
    resources.getPoolInstance();
    resources.getMongooseInstance();
});

afterAll(async () => {
    if (resources.getPoolInstance() !== null) {
        await resources.getPoolInstance().end();
    }
    if (resources.getMongooseInstance() !== null) {
        await resources.getMongooseInstance().connection.close();
    }
});