import express from "express";
import {pool} from "../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    try {
        const queryString = "SELECT id_padecimiento, titulo, tipo FROM padecimiento WHERE id_usuario = $1 order by titulo desc";
        const query = await pool.query(queryString, [idUsuario]);
        const padecimientosList = query.rows;
        const jsonResponse = {"data": padecimientosList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

router.get("/:id_padecimiento", async (req, res) => {
    const params = req.params;
    const idPadecimiento = params["id_padecimiento"];
    if (!idPadecimiento) {
        return res.status(400).send("Falta el id_padecimiento");
    }
    try {
        const queryString = "SELECT id_padecimiento, titulo, tipo, descripcion, sintomas, tratamiento FROM padecimiento WHERE id_padecimiento = $1";
        const query = await pool.query(queryString, [idPadecimiento]);
        const padecimiento = query.rows[0] || {};
        const jsonResponse = padecimiento;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

async function updatePadecimientoFields(idPadecimiento, titulo) {
    const descripcion = "La diabetes es una enfermedad crónica que se caracteriza por niveles elevados de glucosa (azúcar) en la sangre.";
    const sintomas = "*Sed excesiva y micción frecuente. \n *Aumento del apetito. \n *Pérdida de peso inexplicada. \n *Fatiga y debilidad. \n *Visión borrosa. ...";
    const tratamiento = "El tratamiento de la diabetes se basa en el control de los niveles de glucosa en la sangre. Esto puede implicar una combinación de cambios en el estilo de vida, como una dieta saludable y actividad física.";
    try {
        const queryString = "UPDATE padecimiento SET descripcion = $1, sintomas = $2, tratamiento = $3 WHERE id_padecimiento = $4";
        const query = await pool.query(queryString, [descripcion, sintomas, tratamiento, idPadecimiento]);
        return query;
    } catch(error) {
        return console.log(error);
    }
}

router.post("/", async (req, res) => {
    const body = req.body;
    const id_usuario = body["id_usuario"];
    if (!id_usuario) {
        return res.status(400).send("Falta el id_usuario");
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
        const queryString = "INSERT INTO padecimiento (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_padecimiento";
        const query = await pool.query(queryString, [id_usuario, titulo, tipo]);
        const idPadecimiento = query.rows[0] || {};
        await updatePadecimientoFields(idPadecimiento.id_padecimiento, titulo);
        const jsonResponse = idPadecimiento;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;