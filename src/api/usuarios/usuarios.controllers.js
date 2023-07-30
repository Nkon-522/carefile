import { queryExecution } from "../../utils/queryExecution.helpers.js";

import { 
    getUsuarioQuery, 
    getMedicacionesQuery, 
    getAlergiasQuery,
    getPadecimientosQuery,
    getCirugiasQuery
} from "./usuarios.helpers.js";

export const getUsuario = async (req, res) => {
    try {
        const userQuery = await queryExecution(getUsuarioQuery, res.locals.getUsuarioParams);
        const userInfo = userQuery.rows[0] || {};
        
        const alergiasQuery = await queryExecution(getAlergiasQuery, res.locals.getUsuarioParams);
        const alergiasList = alergiasQuery.rows || [];

        const medicacionesQuery = await queryExecution(getMedicacionesQuery, res.locals.getUsuarioParams);
        const medicacionesList = medicacionesQuery.rows || [];

        const padecimientosQuery = await queryExecution(getPadecimientosQuery, res.locals.getUsuarioParams);
        const padecimientosList = padecimientosQuery.rows || [];

        const cirugiasQuery = await queryExecution(getCirugiasQuery, res.locals.getUsuarioParams);
        const cirugiasList = cirugiasQuery.rows || [];

        const jsonResponse = userInfo;
        jsonResponse["alergias"] = alergiasList;
        jsonResponse["medicacion"] = medicacionesList;
        jsonResponse["padecimientos"] = padecimientosList;
        jsonResponse["cirugias"] = cirugiasList;
        /*jsonResponse["padecimientos"] = 
        [
            {"titulo":"diabetes"}, { "titulo":"artritis"}
        ];
        jsonResponse["cirugias"] = [
            {"titulo":"apendicectomia"}, {"titulo":"lasik"}
        ];*/

        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};