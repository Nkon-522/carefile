import express from "express";
import { getCirugias, getCirugia, createCirugia } from "./cirugias.controllers.js";
import { getCirugiasMiddlewares, getCirugiaMiddlewares, createCirugiaMiddlewares } from "./cirugias.middlewares.js";

export const cirugiasRouter = express.Router();

cirugiasRouter.get("/", getCirugiasMiddlewares, getCirugias);

cirugiasRouter.get("/:id_cirugia", getCirugiaMiddlewares, getCirugia);

cirugiasRouter.post("/", createCirugiaMiddlewares, createCirugia);