import express from "express";
import alergiaRouter from  "./router/alergia.js";

const app = express();
app.use("/alergia", alergiaRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000);
console.log("Server is listening on port", 3000);