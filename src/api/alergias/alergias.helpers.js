import { pool } from "../../db/db.js";
import { openai } from "../../openai/openai.js"

export const getAlergiasQuery = "SELECT id_alergia, titulo, tipo FROM alergia WHERE id_usuario = $1 order by titulo asc";

export const getAlergiaQuery = "SELECT id_alergia, titulo, tipo, descripcion, sintomas, tratamiento FROM alergia WHERE id_alergia = $1";

export const createAlergiaQuery = "INSERT INTO alergia (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_alergia;";

export async function updateAlergiaFields(idAlergia, titulo) {
/*
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
*/

    const descripcion = `La alergia a Apis melifera, también conocida como alergia a las abejas, es una reacción alérgica desencadenada por la picadura de abejas melíferas. Esta especie de abeja es comúnmente encontrada en México y en muchas otras partes del mundo.

Cuando una persona alérgica a Apis melifera es picada, su sistema inmunológico reacciona de manera exagerada a las proteínas presentes en el veneno de la abeja. Esto puede desencadenar una serie de síntomas, que van desde leves a potencialmente mortales.

Los síntomas comunes de esta alergia incluyen enrojecimiento, hinchazón y picazón en el área de la picadura. Además, pueden presentarse síntomas más graves como dificultad para respirar, hinchazón en la garganta, mareos, náuseas y vómitos. En casos extremos, una picadura de abeja puede provocar una reacción alérgica grave llamada anafilaxia, que puede ser potencialmente mortal si no se trata de inmediato.

Si se sospecha una alergia a Apis melifera, es importante buscar atención médica de inmediato. El médico puede realizar pruebas de alergia para confirmar el diagnóstico y ofrecer recomendaciones sobre cómo evitar futuras picaduras y cómo manejar los síntomas en caso de exposición. En algunos casos, puede ser necesario llevar consigo un autoinyector de epinefrina para tratar una reacción alérgica severa.`;

    const sintomas = `- Picazón en la piel
- Enrojecimiento y hinchazón
- Estornudos y secreción nasal
- Tos y dificultad para respirar
- Ojos llorosos y con picazón
- Ronchas y urticaria en la piel
- Náuseas y vómitos
- Mareos y desmayos
- Reacciones graves como dificultad para respirar y pérdida del conocimiento`;

    const tratamiento = `1. Evitar el contacto con las abejas y sus productos, como miel o cera de abejas.
2. Usar ropa protectora al estar al aire libre, como mangas largas y pantalones.
3. Utilizar repelentes de insectos que sean seguros para personas alérgicas.
4. Mantener siempre un autoinyector de epinefrina (como EpiPen) a mano en caso de una reacción alérgica grave.
5. Consultar a un alergólogo para realizar pruebas de alergia y determinar si se necesita un tratamiento específico.
6. Tomar antihistamínicos para aliviar los síntomas leves de la alergia.
7. Considerar la inmunoterapia, también conocida como vacunas para la alergia, para reducir la sensibilidad alérgica a largo plazo.
8. Tener un plan de acción en caso de una reacción alérgica, incluyendo saber cómo administrar la epinefrina correctamente.
9. Mantenerse informado sobre los avances en investigación y tratamiento de las alergias a Apis mellifera.`;
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