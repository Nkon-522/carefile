import { pool } from "../../db/db.js";

export const getMedicacionesQuery = "SELECT id_medicacion, titulo, tipo FROM medicacion WHERE id_usuario = $1 order by titulo asc";

export const getMedicacionQuery = "SELECT id_medicacion, titulo, tipo, descripcion, indicaciones, modo_uso, precauciones FROM medicacion WHERE id_medicacion = $1";

export const createMedicacionQuery = "INSERT INTO medicacion (id_usuario, titulo, tipo) VALUES ($1, $2, $3) RETURNING id_medicacion;";

export async function updateMedicacionFields(idMedicacion, titulo) {
    
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

