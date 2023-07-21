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
        const queryString = "SELECT nombres, apellidos, direccion, telefono_emergencias FROM usuario WHERE id_usuario = $1";
        const userQuery = await pool.query(queryString, [idUsuario]);
        const userInfo = userQuery.rows[0] || {};

        const medicacionesQueryString = "SELECT titulo FROM medicacion WHERE id_usuario = $1 order by titulo asc limit 3";
        const medicacionesQuery = await pool.query(medicacionesQueryString, [idUsuario]);
        const medicacionesList = medicacionesQuery.rows || [];

        const alergiasQueryString = "SELECT titulo FROM alergia WHERE id_usuario = $1 order by titulo asc limit 3";
        const alergiasQuery = await pool.query(alergiasQueryString, [idUsuario]);
        const alergiasList = alergiasQuery.rows || [];

        const jsonResponse = userInfo;
        jsonResponse["alergias"] = alergiasList;
        jsonResponse["medicacion"] = medicacionesList;
        jsonResponse["padecimientos"] = 
        [
            {"titulo":"diabetes"}, { "titulo":"artritis"}
        ];
        jsonResponse["cirugias"] = [
            {"titulo":"apendicectomia"}, {"titulo":"lasik"}
        ];

        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;