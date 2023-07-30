import express from "express";
import { login } from "./login.controllers.js";
import { loginMiddlewares } from "./login.middlewares.js";

export const loginRouter = express.Router();

loginRouter.post("/", loginMiddlewares, login);