import express from "express";
import { getCheck } from "./check.controllers.js";

export const checkRouter = express.Router();

checkRouter.get("/", getCheck);