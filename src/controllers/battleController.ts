import { Request, Response } from "express";
import { battleService } from "../services/battleService.js";

export const battle = async (req: Request, res: Response) => {
    const { firstUser, secondUser } = req.body;
    const battleResult = await battleService.battle(firstUser, secondUser);
    res.send(battleResult);
}