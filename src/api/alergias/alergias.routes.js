import express from "express";
import { getAlergias, getAlergia, createAlergia } from "./alergias.controllers.js";
import { getAlergiasMiddlewares, getAlergiaMiddlewares, createAlergiaMiddlewares } from "./alergias.middlewares.js";

export const alergiasRouter = express.Router();

alergiasRouter.get("/", getAlergiasMiddlewares, getAlergias);

alergiasRouter.get("/:id_alergia", getAlergiaMiddlewares, getAlergia);

alergiasRouter.post("/", createAlergiaMiddlewares, createAlergia);