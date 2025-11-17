import { Router } from "express";
import { service } from "./service";
import { authMiddleware } from "../../middlewares/auth";

export const favoritesRouter = Router();

favoritesRouter.use(authMiddleware);

favoritesRouter.get("/", service.list);
favoritesRouter.post("/", service.add);
favoritesRouter.delete("/:id", service.remove);
