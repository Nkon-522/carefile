const getPadecimientosVerificator = async (req, res, next) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    res.locals.getPadecimientosParams = [ idUsuario ];
    next();
};

export const getPadecimientosMiddlewares = [ getPadecimientosVerificator ];

const getPadecimientoVerificator = async (req, res, next) => {
    const params = req.params;
    const idPadecimiento = params["id_padecimiento"];
    if (!idPadecimiento) {
        return res.status(400).send("Falta el id_padecimiento");
    }
    res.locals.getPadecimientoParams = [ idPadecimiento ];
    next();
};

export const getPadecimientoMiddlewares = [ getPadecimientoVerificator ];

const createPadecimientoVerificator = async (req, res, next) => {
    const body = req.body;
    const idUsuario = body["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    const titulo = body["titulo"];
    if (!titulo) {
        return res.status(400).send("Falta el titulo");
    }
    const tipo = body["tipo"];
    if (!tipo) {
        return res.status(400).send("Falta el tipo");
    }
    res.locals.createPadecimientoParams = [ idUsuario, titulo, tipo ];
    next();
};

export const createPadecimientoMiddlewares = [ createPadecimientoVerificator ];