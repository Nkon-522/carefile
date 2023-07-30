const getCirugiasVerificator = async (req, res, next) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    res.locals.getCirugiasParams = [ idUsuario ];
    next();
};

export const getCirugiasMiddlewares = [ getCirugiasVerificator ];

const getCirugiaVerificator = async (req, res, next) => {
    const params = req.params;
    const idCirugia = params["id_cirugia"];
    if (!idCirugia) {
        return res.status(400).send("Falta el id_cirugia");
    }
    res.locals.getCirugiaParams = [ idCirugia ];
    next();
};

export const getCirugiaMiddlewares = [ getCirugiaVerificator ];

const createCirugiaVerificator = async (req, res, next) => {
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
    res.locals.createCirugiaParams = [ idUsuario, titulo, tipo ];
    next();
};

export const createCirugiaMiddlewares = [ createCirugiaVerificator ];