import "./env/env.js";
import express from "express";
import alergiaRouter from  "./router/alergia.js";
import medicacionRouter from "./router/medicacion.js";

const app = express();
app.use(express.json());

app.use("/alergia", alergiaRouter);
app.use("/medicacion", medicacionRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000);
console.log("Server is listening on port", 3000);