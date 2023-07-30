import { queryExecution } from "../../utils/queryExecution.helpers.js";
import { 
    createAlergiaQuery, 
    getAlergiaQuery, 
    getAlergiasQuery, 
    updateAlergiaFields 
} from "./alergias.helpers.js";

export const getAlergias = async (req, res) => {
    try {
        const query = await queryExecution(getAlergiasQuery, res.locals.getAlergiasParams);
        const alergiasList = query.rows;
        const jsonResponse = {"data": alergiasList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const getAlergia = async (req, res) => {
    try {
        const query = await queryExecution(getAlergiaQuery, res.locals.getAlergiaParams);
        const alergia = query.rows[0] || {};
        const jsonResponse = alergia;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const createAlergia = async (req, res) => {
    try {
        const query = await queryExecution(createAlergiaQuery, res.locals.createAlergiaParams);
        const idAlergia = query.rows[0] || {};
        updateAlergiaFields(idAlergia.id_alergia, req.body["titulo"]);
        const jsonResponse = idAlergia;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};