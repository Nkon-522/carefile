import "./env/env.js";
import express from "express";
import alergiaRouter from  "./router/alergia.js";
import medicacionRouter from "./router/medicacion.js";
import usuarioRouter from "./router/usuario.js"
import recetaRouter from "./router/receta.js";
import padecimientoRouter from "./router/padecimiento.js";
import cirugiaRouter from "./router/cirugia.js";
import loginRouter from "./router/login.js";

const app = express();
app.use(express.json());

app.use("/login", loginRouter);
app.use("/alergia", alergiaRouter);
app.use("/medicacion", medicacionRouter);
app.use("/usuario", usuarioRouter);
app.use("/receta", recetaRouter);
app.use("/padecimiento", padecimientoRouter);
app.use("/cirugia", cirugiaRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000);
console.log("Server is listening on port", 3000);