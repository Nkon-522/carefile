import "./env/env.js";
import express from "express";
import { alergiasRouter } from "./api/alergias/alergias.index.js";
import { medicacionesRouter } from "./api/medicaciones/medicaciones.index.js";
import { usuariosRouter } from "./api/usuarios/usuarios.index.js"
import { recetasRouter } from "./api/recetas/recetas.index.js";
import { padecimientosRouter } from "./api/padecimientos/padecimientos.index.js";
import { cirugiasRouter } from "./api/cirugias/cirugias.index.js";
import { loginRouter } from "./api/login/login.index.js";
import { registerRouter } from "./api/register/register.index.js";

import { checkRouter } from "./api/check/check.index.js";
import { verifyToken } from "./middleware/auth.js";
import { logRequest } from "./middleware/logger.js";

const app = express();
app.use(express.json());

app.use(logRequest);

app.use("/check", checkRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

//app.use(verifyToken);
app.use("/alergias", alergiasRouter);
app.use("/medicaciones", medicacionesRouter);
app.use("/usuarios", usuariosRouter);
app.use("/recetas", recetasRouter);
app.use("/padecimientos", padecimientosRouter);
app.use("/cirugias", cirugiasRouter);

export default app;