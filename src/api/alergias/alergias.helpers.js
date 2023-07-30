import { pool } from "../../db/db.js";
import { openai } from "../../openai/openai.js"

export const getAlergiasQuery = "SELECT id_alergia, titulo, tipo FROM alergia WHERE id_usuario = $1 order by titulo asc";

export const getAlergiaQuery = "SELECT id_alergia, titulo, tipo, descripcion, sintomas, tratamiento FROM alergia WHERE id_alergia = $1";

export const createAlergiaQuery = "INSERT INTO alergia (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_alergia;";

export async function updateAlergiaFields(idAlergia, titulo) {
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
        console.log(error);
        return "Error en la base de datos";
        // return res.status(500).send("Error en la base de datos");
    }
}