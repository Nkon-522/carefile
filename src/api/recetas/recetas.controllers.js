import { queryExecution } from "../../utils/queryExecution.helpers.js";
import { 
    createRecetaQuery, 
    getRecetaQuery, 
    getRecetasQuery, 
    generateRecetaImageUrl
} from "./recetas.helpers.js";

export const getRecetas = async (req, res) => {
    try {
        const query = await queryExecution(getRecetasQuery, res.locals.getRecetasParams);
        const recetasList = query.rows;
        const jsonResponse = {"data": recetasList};
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const getReceta = async (req, res) => {
    try {
        const query = await queryExecution(getRecetaQuery, res.locals.getRecetaParams);
        const receta = query.rows[0] || {};
        let jsonResponse = receta;
        if (receta["path_image"]) {
            jsonResponse["presigned_url"] = await generateRecetaImageUrl(receta["path_image"]);
        }
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};

export const createReceta = async (req, res) => {
    try {
        const query = await queryExecution(createRecetaQuery, res.locals.createRecetaParams);
        const idReceta = query.rows[0] || {};
        const jsonResponse = idReceta;
        return res.status(200).json(jsonResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};