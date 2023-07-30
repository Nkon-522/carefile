import { queryExecution } from "../../utils/queryExecution.helpers.js";
import { 
    createMedicacionQuery, 
    getMedicacionQuery, 
    getMedicacionesQuery,
    updateMedicacionFields 
} from "./medicaciones.helpers.js";
import { Medicina } from "../../mongodb/mongodb.js";

export const getMedicaciones = async (req, res) => {
    try {
        const query = await queryExecution(getMedicacionesQuery, res.locals.getMedicacionesParams);
        const medicacionesList = query.rows;
        const jsonResponse = {"data": medicacionesList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const getMedicacionSearch = async (req, res) => {
    try {
        const medicina = await Medicina.findOne({nombre: res.locals.getMedicacionSearchParams[0]});
        const jsonResponse = medicina || {};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
}

export const getMedicacion = async (req, res) => {
    try {
        const query = await queryExecution(getMedicacionQuery, res.locals.getMedicacionParams);
        const medicacion = query.rows[0] || {};
        const jsonResponse = medicacion;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const createMedicacion = async (req, res) => {
    try {
        const query = await queryExecution(createMedicacionQuery, res.locals.createMedicacionParams);
        const idMedicacion = query.rows[0] || {};
        updateMedicacionFields(idMedicacion.id_medicacion, req.body["titulo"]);
        const jsonResponse = idMedicacion;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};