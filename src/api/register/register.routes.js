import express from "express";
import { register } from "./register.controllers.js";
import { registerMiddlewares } from "./register.middlewares.js";

export const registerRouter = express.Router();

registerRouter.post("/", registerMiddlewares, register);