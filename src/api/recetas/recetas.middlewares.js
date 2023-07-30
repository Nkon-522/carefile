const getRecetasVerificator = async (req, res, next) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    res.locals.getRecetasParams = [ idUsuario ];
    next();
};

export const getRecetasMiddlewares = [ getRecetasVerificator ];

const getRecetaVerificator = async (req, res, next) => {
    const params = req.params;
    const idReceta = params["id_receta"];
    if (!idReceta) {
        return res.status(400).send("Falta el id_receta");
    }
    res.locals.getRecetaParams = [ idReceta ];
    next();
};

export const getRecetaMiddlewares = [ getRecetaVerificator ];

const createRecetaVerificator = async (req, res, next) => {
    const body = req.body;
    const id_usuario = body["id_usuario"];
    const descripcion = body["descripcion"];
    const fecha_inicio = new Date(body["fecha_inicio"]);
    const medicamento = body["medicamento"];
    const cantidad_medicamento = body["cantidad_medicamento"];
    const unidad = body["unidad"];
    const instruccion = body["instruccion"];
    const detalle_usuario = body["detalle_usuario"];
    const dosis = body["dosis"];
    const cada = body["cada"];
    const via = body["via"];
    const dias = body["dias"];
    const cantidad = body["cantidad"];
    const informacion_adicional = body["informacion_adicional"];
    const firma_medico = body["firma_medico"];
    const numero_licencia = body["numero_licencia"];
    const path_image = body["path_image"];

    const required_fields = [ id_usuario, descripcion, fecha_inicio, medicamento, cantidad_medicamento, unidad, instruccion, detalle_usuario, dosis, cada, via, dias, cantidad, informacion_adicional, firma_medico, numero_licencia, path_image ];
    if (required_fields.some(field => field === undefined)) {
        return res.status(400).send("Faltan campos requeridos");
    }
    res.locals.createRecetaParams = required_fields;
    next();
};

export const createRecetaMiddlewares = [ createRecetaVerificator ];