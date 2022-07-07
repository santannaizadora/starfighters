import { rankingRepository } from "../repositories/rankingRepository.js";


const getRanking = async () => {
  return await rankingRepository.ranking();
}

export const rankingService = {
  getRanking
}