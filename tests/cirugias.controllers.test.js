import request from "supertest";

import resources from "./utils/resources.js";

let app = resources.getAppInstance();

describe("Test alergias.controllers.js", () => {

    test("GET /alergias", async () => {
        const res =  await 
            request(app)
            .get("/alergias")
            .query(
                { 
                    id_usuario: 15 
                }
            )
            .send();
        expect(res.statusCode).toEqual(200);
    });

    let id_alergia = 33;
    test(`GET /alergia/:id_alergia`, async () => {
        const res = await
            request(app)
            .get(`/alergias/${id_alergia}`)
            .send();
        expect(res.statusCode).toEqual(200);
    });
});