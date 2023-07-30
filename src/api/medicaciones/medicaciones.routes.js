import express from "express";
import { getMedicaciones, getMedicacion, createMedicacion, getMedicacionSearch } from "./medicaciones.controllers.js";
import { getMedicacionesMiddlewares, getMedicacionMiddlewares, createMedicacionMiddlewares, getMedicacionSearchMiddlewares } from "./medicaciones.middlewares.js";

export const medicacionesRouter = express.Router();

medicacionesRouter.get("/", getMedicacionesMiddlewares, getMedicaciones);

medicacionesRouter.get("/search", getMedicacionSearchMiddlewares, getMedicacionSearch);

medicacionesRouter.get("/:id_medicacion", getMedicacionMiddlewares, getMedicacion);

medicacionesRouter.post("/", createMedicacionMiddlewares, createMedicacion);