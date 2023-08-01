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
        const nombre_usuario_query = await queryExecution("SELECT nombres, apellidos FROM usuario WHERE id_usuario = $1", [receta["id_usuario"]]);
        const nombre_usuario = nombre_usuario_query.rows[0] || {};
        jsonResponse["nombres"] = nombre_usuario["nombres"];
        jsonResponse["apellidos"] = nombre_usuario["apellidos"];
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