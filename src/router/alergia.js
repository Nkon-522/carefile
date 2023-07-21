import express from "express";
import { pool } from "../db/index.js";
import { openai } from "../openai/index.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    try {
        const queryString = "SELECT id_alergia, titulo, tipo FROM alergia WHERE id_usuario = $1 order by titulo asc"
        const query = await pool.query(queryString, [idUsuario]);
        const alergiasList = query.rows;
        const jsonResponse = {"data": alergiasList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

async function updateAlergiaFields(idAlergia, titulo) {
    const descripcion_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just provide a description of this allergy condition in less than 200 words and in this language code es-MX: ${titulo}` }
        ],
    });
    const descripcion = descripcion_chat_completion.data.choices[0]["message"]["content"];

    const sintomas_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just respond with the list the symptoms of this allergy condition as a bullet point list with less than 10 bullet points and in this language code es-MX: ${titulo}` }
        ],
    });
    const sintomas = sintomas_chat_completion.data.choices[0]["message"]["content"];

    const tratamiento_chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        temperature: 0.5,
        messages: [
            { role: "system", content: "You are a helpful assistant."},
            { role: "user", content: `Please just respond with a list of the treatment for this allergy condition as a numbered list with less than 10 points and in this language code es-MX: ${titulo}` }
        ],
    });
    const tratamiento = tratamiento_chat_completion.data.choices[0]["message"]["content"];

    try {
        const queryString = "UPDATE alergia SET descripcion = $1, sintomas = $2, tratamiento = $3 WHERE id_alergia = $4";
        const query = await pool.query(queryString, [descripcion, sintomas, tratamiento, idAlergia]);
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
        const queryString = "INSERT INTO alergia (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_alergia;";
        const query = await pool.query(queryString, [idUsuario, titulo, tipo]);
        const idAlergia = query.rows[0] || {};
        updateAlergiaFields(idAlergia.id_alergia, titulo);
        const jsonResponse = idAlergia;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

router.get("/:id_alergia", async (req, res) => {
    const params = req.params;
    const idAlergia = params["id_alergia"];
    if (!idAlergia) {
        return res.status(400).send("Falta el id_alergia");
    }
    try {
        const queryString = "SELECT id_alergia, titulo, tipo, descripcion, sintomas, tratamiento FROM alergia WHERE id_alergia = $1";
        const query = await pool.query(queryString, [idAlergia]);
        const alergia = query.rows[0] || {};
        const jsonResponse = alergia;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;