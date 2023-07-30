const getAlergiasVerificator = async (req, res, next) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    res.locals.getAlergiasParams = [ idUsuario ];
    next();
};

export const getAlergiasMiddlewares = [ getAlergiasVerificator ];

const getAlergiaVerificator = async (req, res, next) => {
    const params = req.params;
    const idAlergia = params["id_alergia"];
    if (!idAlergia) {
        return res.status(400).send("Falta el id_alergia");
    }
    res.locals.getAlergiaParams = [ idAlergia ];
    next();
};

export const getAlergiaMiddlewares = [ getAlergiaVerificator ];

const createAlergiaVerificator = async (req, res, next) => {
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
    res.locals.createAlergiaParams = [ idUsuario, titulo, tipo ];
    next();
};

export const createAlergiaMiddlewares = [ createAlergiaVerificator ];