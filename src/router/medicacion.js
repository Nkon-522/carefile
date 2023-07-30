import express from "express";
import { pool } from "../db/db.js";
import { openai } from "../openai/openai.js"
import { Medicina } from "../mongodb/mongodb.js";

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

router.get("/search", async (req, res) => {
    const query = req.query;
    const nombreMedicina = query["nombre_medicina"];
    if (!nombreMedicina) {
        return res.status(400).send("Falta el nombre_medicina");
    }
    try {
        const medicina = await Medicina.findOne({nombre: nombreMedicina});
        const jsonResponse = medicina || {};
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
    
    const descripcion = "El paracetamol es un analgésico y antipirético utilizado comúnmente para aliviar el dolor y reducir la fiebre."

    const indicaciones = "Panadol se utiliza para el alivio temporal de dolores leves a moderados, como dolores de cabeza, dolores musculares, dolores de espalda, dolores menstruales y dolores asociados a resfriados y gripe. También se utiliza para reducir la fiebre en caso de fiebre leve a moderada.";

    const modoUso = "Panadol está disponible en forma de tabletas o cápsulas para administración oral. Las dosis recomendadas y la frecuencia de administración pueden variar según la edad, el peso y la condición médica del paciente. Es importante seguir las instrucciones proporcionadas por el médico o las indicaciones en el empaque del medicamento.";

    const precauciones = "* No exceder la dosis recomendada para evitar...";

    try {
        const queryString = "UPDATE medicacion SET descripcion = $1, indicaciones = $2, modo_uso = $3, precauciones = $4 WHERE id_medicacion = $5";
        const query = await pool.query(queryString, [descripcion, indicaciones, modoUso, precauciones, idMedicacion]);
        return query;
    } catch (error) {
        return console.log(error);
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