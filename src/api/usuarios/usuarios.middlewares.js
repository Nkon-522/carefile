const getUsuarioVerificator = async (req, res, next) => {
    const query = req.query;
    const idUsuario = query["id_usuario"];
    if (!idUsuario) {
        return res.status(400).send("Falta el id_usuario");
    }
    res.locals.getUsuarioParams = [ idUsuario ];
    next();
};

export const getUsuarioMiddlewares = [ getUsuarioVerificator ];