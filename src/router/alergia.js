import express from "express";
import { pool } from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(404).send("Falta el id_usuario");
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

router.get("/:id", (req, res) => {
    const query = req.query;
    console.log(query);
    const params = req.params;
    console.log(params);
    const id = params["id"];
    console.log(id);
    res.send("Hola desde alergias con id " + id);
});

export default router;