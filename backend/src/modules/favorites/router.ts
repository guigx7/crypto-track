import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { prisma } from "../../prisma";

export const favoritesRouter = Router();

favoritesRouter.use(authMiddleware);

favoritesRouter.post("/", async (req, res) => {
  const userId = req.user!.id;
  const { coinId } = req.body;

  const existing = await prisma.favorite.findFirst({
    where: { userId, coinId }
  });

  if (existing) return res.json(existing);

  const fav = await prisma.favorite.create({
    data: { userId, coinId }
  });

  res.json(fav);
});

favoritesRouter.get("/", async (req, res) => {
  const userId = req.user!.id;

  const favs = await prisma.favorite.findMany({
    where: { userId }
  });

  res.json(favs);
});

favoritesRouter.delete("/:coinId", async (req, res) => {
  const userId = req.user!.id;
  const coinId = req.params.coinId;

  await prisma.favorite.deleteMany({
    where: { userId, coinId }
  });

  res.json({ success: true });
});
