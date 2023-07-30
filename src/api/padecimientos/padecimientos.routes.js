import express from "express";
import { getPadecimientos, getPadecimiento, createPadecimiento } from "./padecimientos.controllers.js";
import { getPadecimientosMiddlewares, getPadecimientoMiddlewares, createPadecimientoMiddlewares } from "./padecimientos.middlewares.js";

export const padecimientosRouter = express.Router();

padecimientosRouter.get("/", getPadecimientosMiddlewares, getPadecimientos);

padecimientosRouter.get("/:id_padecimiento", getPadecimientoMiddlewares, getPadecimiento);

padecimientosRouter.post("/", createPadecimientoMiddlewares, createPadecimiento);