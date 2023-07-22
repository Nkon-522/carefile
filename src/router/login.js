import express from "express";
import { pool } from "../db/db.js";

import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;

import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    const dni = body["dni"];
    if (!dni) {
        return res.status(400).send("Falta el dni");
    }
    const contrasena = body["contrasena"];
    if (!contrasena) {
        return res.status(400).send("Falta la contraseña");
    }
    try {
        const queryString = "SELECT id_usuario, correo, nombres, contrasena FROM usuario WHERE dni = $1";
        const query = await pool.query(queryString, [dni]);
        if (query.rowCount === 0) {
            return res.status(401).send("Usuario no encontrado");
        }
        const usuario = query.rows[0];
        const usuarioDict = {
            "id_usuario": usuario.id_usuario,
            "correo": usuario.correo,
            "contrasena": usuario.contrasena,
        };
        if (await compare(contrasena, usuario.contrasena)) {
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
});


export default router;