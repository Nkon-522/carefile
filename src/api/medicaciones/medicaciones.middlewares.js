const getMedicacionesVerificator = async (req, res, next) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    res.locals.getMedicacionesParams = [ idUsuario ];
    next();
};

export const getMedicacionesMiddlewares = [ getMedicacionesVerificator ];

const getMedicacionVerificator = async (req, res, next) => {
    const params = req.params;
    const idMedicacion = params["id_medicacion"];
    if (!idMedicacion) {
        return res.status(400).send("Falta el id_medicacion");
    }
    res.locals.getMedicacionParams = [ idMedicacion ];
    next();
};

export const getMedicacionMiddlewares = [ getMedicacionVerificator ];

const createMedicacionVerificator = async (req, res, next) => {
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
    res.locals.createMedicacionParams = [ idUsuario, titulo, tipo ];
    next();
};

export const createMedicacionMiddlewares = [ createMedicacionVerificator ];

const getMedicacionSearchVerificator = async (req, res, next) => {
    const query = req.query;
    const nombreMedicina = query["nombre_medicina"];
    if (!nombreMedicina) {
        return res.status(400).send("Falta el nombre_medicina");
    }
    res.locals.getMedicacionSearchParams = [ nombreMedicina ];
    next();
}

export const getMedicacionSearchMiddlewares = [ getMedicacionSearchVerificator ];
