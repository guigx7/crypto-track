import { Router } from "express";
import { service } from "./service";

export const authRouter = Router();

authRouter.post("/register", service.register);
authRouter.post("/login", service.login);
