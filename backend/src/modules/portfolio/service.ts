import { prisma } from "../../prisma";
import { Request, Response } from "express";

class PortfolioService {
  async list(req: Request, res: Response) {
    const data = await prisma.portfolioEntry.findMany({
      where: { userId: req.user!.id }
    });
    res.json(data);
  }

  async add(req: Request, res: Response) {
    const data = await prisma.portfolioEntry.create({
      data: {
        userId: req.user!.id,
        coinId: req.body.coinId,
        amount: req.body.amount
      }
    });
    res.json(data);
  }

  async update(req: Request, res: Response) {
    const data = await prisma.portfolioEntry.update({
      where: { id: req.params.id },
      data: { amount: req.body.amount }
    });
    res.json(data);
  }

  async remove(req: Request, res: Response) {
    await prisma.portfolioEntry.delete({
      where: { id: req.params.id }
    });
    res.json({ ok: true });
  }
}

export const service = new PortfolioService();
