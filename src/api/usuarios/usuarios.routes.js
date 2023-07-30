import express from "express";
import { getUsuario } from "./usuarios.controllers.js";
import { getUsuarioMiddlewares } from "./usuarios.middlewares.js";

export const usuariosRouter = express.Router();

usuariosRouter.get("/", getUsuarioMiddlewares, getUsuario);