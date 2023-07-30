import express from "express";
import { getRecetas, getReceta, createReceta } from "./recetas.controllers.js";
import { getRecetasMiddlewares, getRecetaMiddlewares, createRecetaMiddlewares } from "./recetas.middlewares.js";

export const recetasRouter = express.Router();

recetasRouter.get("/", getRecetasMiddlewares, getRecetas);

recetasRouter.get("/:id_receta", getRecetaMiddlewares, getReceta);

recetasRouter.post("/", createRecetaMiddlewares, createReceta);