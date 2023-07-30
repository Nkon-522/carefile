import { queryExecution } from "../../utils/queryExecution.helpers.js";

import { createUsuarioQuery } from "./register.helpers.js";

import bcryptjs from "bcryptjs";
const { hash } = bcryptjs;

export const register = async (req, res) => {
    try {
        const query = await queryExecution(createUsuarioQuery, res.locals.registerParams);
        const usuario = query.rows[0];
        const jsonResponse = { "descripcion": "Usuario creado exitosamente", "usuario": usuario };
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};