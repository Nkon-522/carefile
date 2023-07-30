import { queryExecution } from "../../utils/queryExecution.helpers.js";
import { 
    createCirugiaQuery, 
    getCirugiaQuery, 
    getCirugiasQuery, 
    updateCirugiaFields 
} from "./cirugias.helpers.js";

export const getCirugias = async (req, res) => {
    try {
        const query = await queryExecution(getCirugiasQuery, res.locals.getCirugiasParams);
        const cirugiasList = query.rows;
        const jsonResponse = {"data": cirugiasList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const getCirugia = async (req, res) => {
    try {
        const query = await queryExecution(getCirugiaQuery, res.locals.getCirugiaParams);
        const cirugia = query.rows[0] || {};
        const jsonResponse = cirugia;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const createCirugia = async (req, res) => {
    try {
        const query = await queryExecution(createCirugiaQuery, res.locals.createCirugiaParams);
        const idCirugia = query.rows[0] || {};
        updateCirugiaFields(idCirugia.id_cirugia, req.body["titulo"]);
        const jsonResponse = idCirugia;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};