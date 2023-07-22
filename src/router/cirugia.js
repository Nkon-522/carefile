import express from "express";
import { pool } from "../db/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    try {
        const queryString = "SELECT id_cirugia, titulo, tipo FROM cirugia WHERE id_usuario = $1 order by titulo asc";
        const query = await pool.query(queryString, [idUsuario]);
        const cirugiasList = query.rows;
        const jsonResponse = {"data": cirugiasList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

router.get("/:id_cirugia", async (req, res) => {
    const params = req.params;
    const idCirugia = params["id_cirugia"];
    if (!idCirugia) {
        return res.status(400).send("Falta el id_cirugia");
    }
    try {
        const queryString = "SELECT id_cirugia, titulo, tipo, descripcion, recuperacion, recomendaciones FROM cirugia WHERE id_cirugia = $1";
        const query = await pool.query(queryString, [idCirugia]);
        const cirugia = query.rows[0] || {};
        const jsonResponse = cirugia;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

async function updateCirugiaFields(idCirugia, titulo) {
    const descripcion = "La cirugía de cataratas es un procedimiento quirúrgico para tratar las cataratas, que es la opacidad del cristalino del ojo. Durante la cirugía, el cristalino opaco se extrae y se reemplaza por un lente intraocular artificial (LIO) transparente para restaurar la visión.";
    const recuperacion = "La recuperación de la cirugía de cataratas es rápida y sin dolor, pero su visión puede estar borrosa durante unos días después del procedimiento. En la mayoría de los casos, la visión mejora en unas pocas horas y continúa mejorando durante varios días. La mayoría de las personas pueden volver a la mayoría de sus actividades normales en 1 a 2 días.";
    const recomendaciones = "Evite frotarse el ojo o presionarlo. Use anteojos de sol para ayudar a proteger sus ojos de la luz solar brillante y el resplandor. Evite conducir hasta que su médico le diga que está bien hacerlo. No haga ejercicio vigoroso ni levante objetos pesados durante 1 a 2 semanas.";
    try {
        const queryString = "UPDATE cirugia SET descripcion = $1, recuperacion = $2, recomendaciones = $3 WHERE id_cirugia = $4";
        const query = await pool.query(queryString, [descripcion, recuperacion, recomendaciones, idCirugia]);
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
        const queryString = "INSERT INTO cirugia (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_cirugia";
        const query = await pool.query(queryString, [id_usuario, titulo, tipo]);
        const idCirugia = query.rows[0];
        updateCirugiaFields(idCirugia.id_cirugia, titulo);
        const jsonResponse = idCirugia;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;