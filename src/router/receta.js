import express from "express";  
import {pool} from "../db/db.js";
import {s3} from "../aws/aws.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    try {
        const queryString = "SELECT id_receta, id_usuario, descripcion, fecha_inicio FROM receta WHERE id_usuario = $1 order by fecha_inicio desc"
        const query = await pool.query(queryString, [idUsuario]);
        const recetasList = query.rows;
        const jsonResponse = {"data": recetasList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

router.get("/:id_receta", async (req, res) => {
    const params = req.params;
    const idReceta = params["id_receta"];
    if (!idReceta) {
        return res.status(400).send("Falta el id_receta");
    }
    try {
        const queryString = "SELECT id_receta, id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image FROM receta WHERE id_receta = $1";
        const query = await pool.query(queryString, [idReceta]);
        const receta = query.rows[0] || {};
        let jsonResponse = receta;
        if (receta["path_image"]) {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: receta["path_image"],
            };
            const signedUrl = await s3.getSignedUrlPromise("getObject", params);
            jsonResponse["presigned_url"] = signedUrl;
        }
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

router.post("/", async (req, res) => {
    const body = req.body;
    const id_usuario = body["id_usuario"];
    const descripcion = body["descripcion"];
    const fecha_inicio = new Date(body["fecha_inicio"]);
    const medicamento = body["medicamento"];
    const cantidad_medicamento = body["cantidad_medicamento"];
    const unidad = body["unidad"];
    const instruccion = body["instruccion"];
    const detalle_usuario = body["detalle_usuario"];
    const dosis = body["dosis"];
    const cada = body["cada"];
    const via = body["via"];
    const dias = body["dias"];
    const cantidad = body["cantidad"];
    const informacion_adicional = body["informacion_adicional"];
    const firma_medico = body["firma_medico"];
    const numero_licencia = body["numero_licencia"];
    const path_image = body["path_image"];

    const required_fields = [ id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image ];
    if (required_fields.some(field => field === undefined)) {
        return res.status(400).send("Faltan campos requeridos");
    }

    try {
        const queryString = "INSERT INTO receta (id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17) RETURNING id_receta";
        const query = await pool.query(queryString, [id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image]);
        const id_receta = query.rows[0] || {};
        const jsonResponse = id_receta;
        return res.status(200).json(jsonResponse);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;