const loginVerificator = async (req, res, next) => {
    const body = req.body;
    const dni = body["dni"];
    if (!dni) {
        return res.status(400).send("Falta el dni");
    }
    const contrasena = body["contrasena"];
    if (!contrasena) {
        return res.status(400).send("Falta la contraseña");
    }
    res.locals.loginParams = [ dni ];
    next();
};

export const loginMiddlewares = [ loginVerificator ];