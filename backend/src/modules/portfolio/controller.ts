import { Router } from "express";
import { service } from "./service";
import { authMiddleware } from "../../middlewares/auth";

export const portfolioRouter = Router();

portfolioRouter.use(authMiddleware);

portfolioRouter.get("/", service.list);
portfolioRouter.post("/", service.add);
portfolioRouter.put("/:id", service.update);
portfolioRouter.delete("/:id", service.remove);
