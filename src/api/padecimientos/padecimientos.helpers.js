import { pool } from "../../db/db.js";

export const getPadecimientosQuery = "SELECT id_padecimiento, titulo, tipo FROM padecimiento WHERE id_usuario = $1 order by titulo desc";

export const getPadecimientoQuery = "SELECT id_padecimiento, titulo, tipo, descripcion, sintomas, tratamiento FROM padecimiento WHERE id_padecimiento = $1";

export const createPadecimientoQuery = "INSERT INTO padecimiento (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_padecimiento";

export async function updatePadecimientoFields(idPadecimiento, titulo) {
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