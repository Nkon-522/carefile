import bcryptjs from "bcryptjs";
const { hash } = bcryptjs;

import { pool } from "../../db/db.js";
import { queryExecution } from "../../utils/queryExecution.helpers.js";

const emailQueryString = "SELECT correo FROM usuario WHERE correo = $1";

const dniQueryString = "SELECT dni FROM usuario WHERE dni = $1";

const registerVerificator = async (req, res, next) => {
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
    const hashedPassword = await hash(contrasena, 10);

    res.locals.registerParams = [ nombres, apellidos, dia_nacimiento, mes_nacimiento, ano_nacimiento, correo, dni, hashedPassword, telefono_emergencias, direccion ];
    next();
};

const uniqueEmailVerificator = async (req, res, next) => {
    const correo = res.locals.registerParams[5];
    const query = await queryExecution(emailQueryString, [correo]);
    if (query.rowCount > 0) {
        return res.status(400).send("El correo ya existe");
    }
    next();
};

const uniqueDniVerificator = async (req, res, next) => {
    const dni = res.locals.registerParams[6];
    const query = await queryExecution(dniQueryString, [dni]);
    if (query.rowCount > 0) {
        return res.status(400).send("El dni ya existe");
    }
    next();
};

export const registerMiddlewares = [ registerVerificator, uniqueEmailVerificator, uniqueDniVerificator ];