import { queryExecution } from "../../utils/queryExecution.helpers.js";
import { 
    createPadecimientoQuery, 
    getPadecimientoQuery, 
    getPadecimientosQuery, 
    updatePadecimientoFields 
} from "./padecimientos.helpers.js";

export const getPadecimientos = async (req, res) => {
    try {
        const query = await queryExecution(getPadecimientosQuery, res.locals.getPadecimientosParams);
        const padecimientosList = query.rows;
        const jsonResponse = {"data": padecimientosList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const getPadecimiento = async (req, res) => {
    try {
        const query = await queryExecution(getPadecimientoQuery, res.locals.getPadecimientoParams);
        const padecimiento = query.rows[0] || {};
        const jsonResponse = padecimiento;
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const createPadecimiento = async (req, res) => {
    try {
        const query = await queryExecution(createPadecimientoQuery, res.locals.createPadecimientoParams);
        const idPadecimiento = query.rows[0] || {};
        updatePadecimientoFields(idPadecimiento.id_padecimiento, req.body["titulo"]); 
        const jsonResponse = idPadecimiento;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};