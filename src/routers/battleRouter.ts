import { Router } from "express";
import { battle } from "../controllers/battleController.js";
import { checkBattleBody } from "../middlewares/battleMiddleware.js";

const router = Router();

router.post("/battle", checkBattleBody, battle);

export default router;