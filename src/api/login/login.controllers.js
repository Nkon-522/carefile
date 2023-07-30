import { queryExecution } from "../../utils/queryExecution.helpers.js";

import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;

import { getUsuarioQuery } from "./login.helpers.js";

export const login = async (req, res) => {
    try {
        const query = await queryExecution(getUsuarioQuery, res.locals.loginParams);
        if (query.rowCount === 0) {
            return res.status(401).send("Usuario no encontrado");
        }
        const usuario = query.rows[0];
        const usuarioDict = {
            "id_usuario": usuario.id_usuario,
            "correo": usuario.correo,
            "contrasena": usuario.contrasena,
        };
        if (await compare(req.body["contrasena"], usuario.contrasena)) {
            const token = sign(usuarioDict, process.env.JWT_SECRET, {expiresIn: "1d"});
            const jsonResponse = {
                "token": token,
                "usuario" : [
                    usuario.id_usuario,
                    usuario.correo,
                    usuario.nombres
                ]
            };
            return res.status(200).json(jsonResponse);
        } else {
            return res.status(401).send("Contraseña incorrecta");
        }
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
};