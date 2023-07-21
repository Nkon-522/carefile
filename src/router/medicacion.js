import express from "express";
import { pool } from "../db/db.js";
import { openai } from "../openai/openai.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    try {
        const queryString = "SELECT id_medicacion, titulo, tipo FROM medicacion WHERE id_usuario = $1 order by titulo asc"
        const query = await pool.query(queryString, [idUsuario]);
        const medicacionesList = query.rows;
        const jsonResponse = {"data": medicacionesList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});



router.get("/:id_medicacion", async (req, res) => {
    const params = req.params;
    const idMedicacion = params["id_medicacion"];
    if (!idMedicacion) {
        return res.status(400).send("Falta el id_medicacion");
    }
    try {
        const queryString = "SELECT id_medicacion, titulo, tipo, descripcion, indicaciones, modo_uso, precauciones FROM medicacion WHERE id_medicacion = $1";
        const query = await pool.query(queryString, [idMedicacion]);
        const medicacion = query.rows[0] || {};
        const jsonResponse = medicacion;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

async function updateMedicacionFields(idMedicacion, titulo) {
    const descripcion_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just provide a description of this medicine in less than 200 words and in this language code es-MX: ${titulo}` }
        ],
    });
    const descripcion = descripcion_chat_completion.data.choices[0]["message"]["content"];

    const indicaciones_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just respond with the indications of this medicine in this language code es-MX: ${titulo}` }
        ],
    });
    const indicaciones = indicaciones_chat_completion.data.choices[0]["message"]["content"];

    const modoUso_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just respond with the way of using this medicine in this language code es-MX: ${titulo}` }
        ],
    });
    const modoUso = modoUso_chat_completion.data.choices[0]["message"]["content"];

    const precauciones_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just respond with the precautions of this medicine in this language code es-MX: ${titulo}` }
        ],
    });
    const precauciones = precauciones_chat_completion.data.choices[0]["message"]["content"];

    try {
        const queryString = "UPDATE medicacion SET descripcion = $1, indicaciones = $2, modo_uso = $3, precauciones = $4 WHERE id_medicacion = $5";
        const query = await pool.query(queryString, [descripcion, indicaciones, modoUso, precauciones, idMedicacion]);
        return query;
        // return res.status(200).json(jsonResponse);
    } catch (error) {
        return console.log(error);
        // return res.status(500).send("Error en la base de datos");
    }
}

router.post("/", async (req, res) => {
    const body = req.body;
    const idUsuario = body["id_usuario"];
    if (!idUsuario) {
        return res.status(404).send("Falta el id_usuario");
    }
    const titulo = body["titulo"];
    if (!titulo) {
        return res.status(400).send("Falta el titulo");
    }
    const tipo = body["tipo"];
    if (!tipo) {
        return res.status(400).send("Falta el tipo");
    }
    try {
        const queryString = "INSERT INTO medicacion (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_medicacion;";
        const query = await pool.query(queryString, [idUsuario, titulo, tipo]);
        const idMedicacion = query.rows[0] || {};
        updateMedicacionFields(idMedicacion.id_medicacion, titulo);
        const jsonResponse = idMedicacion;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;