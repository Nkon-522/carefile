import jsonwebtoken from "jsonwebtoken";
const { verify } = jsonwebtoken;

export const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["token"];

    if (!token) {
        return res.status(403).send("Se necesita un token para acceder al recurso");
    }
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Token inválido");
    }
    return next();
};