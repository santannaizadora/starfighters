import { Request, Response } from 'express';
import { rankingService } from '../services/rankingService.js';

export const ranking = async (req: Request, res: Response) => {
  const ranking = await rankingService.getRanking();
  res.send(ranking);
}