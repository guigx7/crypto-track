import { Router } from "express";
import { authRouter } from "../modules/auth/controller";
import { favoritesRouter } from "../modules/favorites/controller";
import { portfolioRouter } from "../modules/portfolio/controller";

export const router = Router();

router.use("/auth", authRouter);
router.use("/favorites", favoritesRouter);
router.use("/portfolio", portfolioRouter);
