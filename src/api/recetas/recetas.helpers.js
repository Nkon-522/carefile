import { pool } from "../../db/db.js";
import { s3 } from "../../aws/aws.js";

export const getRecetasQuery = "SELECT id_receta, id_usuario, descripcion, fecha_inicio FROM receta WHERE id_usuario = $1 order by fecha_inicio desc";

export const getRecetaQuery = "SELECT id_receta, id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image FROM receta WHERE id_receta = $1";

export const createRecetaQuery = "INSERT INTO receta (id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13,$14,$15,$16,$17) RETURNING id_receta";

export async function generateRecetaImageUrl(path_image) {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: path_image,
    };
    return await s3.getSignedUrlPromise("getObject", params);
}