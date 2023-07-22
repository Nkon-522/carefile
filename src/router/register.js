import express from "express";
import { pool } from "../db/db.js";

import bcryptjs from "bcryptjs";
const { hash } = bcryptjs;

const router = express.Router();

router.post("/", async (req, res) => {
    const body = req.body;
    const nombres = body["nombres"];
    if (!nombres) {
        return res.status(400).send("Falta el nombre");
    }
    const apellidos = body["apellidos"];
    if (!apellidos) {
        return res.status(400).send("Falta el apellido");
    }
    const dia_nacimiento = body["dia_nacimiento"];
    if (!dia_nacimiento) {
        return res.status(400).send("Falta el dia de nacimiento");
    }
    const mes_nacimiento = body["mes_nacimiento"];
    if (!mes_nacimiento) {
        return res.status(400).send("Falta el mes de nacimiento");
    }
    const ano_nacimiento = body["ano_nacimiento"];
    if (!ano_nacimiento) {
        return res.status(400).send("Falta el año de nacimiento");
    }
    const correo = body["correo"];
    if (!correo) {
        return res.status(400).send("Falta el correo");
    }
    const dni = body["dni"];
    if (!dni) {
        return res.status(400).send("Falta el dni");
    }
    const contrasena = body["contrasena"];
    if (!contrasena) {
        return res.status(400).send("Falta la contraseña");
    }
    const telefono_emergencias = body["telefono_emergencias"];
    if (!telefono_emergencias) {
        return res.status(400).send("Falta el telefono de emergencias");
    }
    const direccion = body["direccion"];
    if (!direccion) {
        return res.status(400).send("Falta la direccion");
    }
    try {
        const hashedPassword = await hash(contrasena, 10);
        const queryString = "INSERT INTO usuario (nombres, apellidos, dia_nacimiento, mes_nacimiento, ano_nacimiento, correo, dni, contrasena, telefono_emergencias, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id_usuario, correo, nombres";
        const query = await pool.query(queryString, [nombres, apellidos, dia_nacimiento, mes_nacimiento, ano_nacimiento, correo, dni, hashedPassword, telefono_emergencias, direccion]);
        const usuario = query.rows[0];
        const jsonResponse = { "descripcion": "Usuario creado exitosamente", "usuario": usuario };
        return res.status(200).json(jsonResponse);
    } catch(error) {
        console.log(error);
        return res.status(500).send("Error en la base de datos");
    }
});

export default router;
