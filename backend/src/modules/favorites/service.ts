import { prisma } from "../../prisma";
import { Request, Response } from "express";

class FavoritesService {
  async list(req: Request, res: Response) {
    const data = await prisma.favorite.findMany({
      where: { userId: req.user!.id }
    });
    res.json(data);
  }

  async add(req: Request, res: Response) {
    const data = await prisma.favorite.create({
      data: { userId: req.user!.id, coinId: req.body.coinId }
    });
    res.json(data);
  }

  async remove(req: Request, res: Response) {
    await prisma.favorite.delete({
      where: { id: req.params.id }
    });
    res.json({ ok: true });
  }
}

export const service = new FavoritesService();
