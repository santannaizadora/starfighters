import axios from "axios";
import { battleRepository } from "../repositories/battleRepository.js";

const saveBattle = async (winner: string, loser: string, draw: boolean, firstUser: string, secondUser: string) => {
    const firstUserFighter = await battleRepository.findFighterByUserName(firstUser);
    const secondUserFighter = await battleRepository.findFighterByUserName(secondUser);
    if (!firstUserFighter) {
      await battleRepository.createFighter(firstUser);
    }
    if (!secondUserFighter) {
      await battleRepository.createFighter(secondUser);
    }
    if (draw) {
      await battleRepository.updateDraws(firstUser);
      await battleRepository.updateDraws(secondUser);
    } else {
      await battleRepository.updateWins(winner);
      await battleRepository.updateLosses(loser);
    }
}

const battle = async (firstUser: string, secondUser: string) => {
  try {
    const firstUserResponse = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
    const secondUserResponse = await axios.get(`https://api.github.com/users/${secondUser}/repos`);
    const firstUserStars = firstUserResponse.data.reduce((acc: Number, repo: any) => acc + repo.stargazers_count, 0);
    const secondUserStars = secondUserResponse.data.reduce((acc: Number, repo: any) => acc + repo.stargazers_count, 0);
    
    let winner: string = null;
    let loser: string = null;
    let draw = false;

    if (firstUserStars > secondUserStars) {
      winner = firstUser;
      loser = secondUser;
    } else if (firstUserStars < secondUserStars) {
      winner = secondUser;
      loser = firstUser;
    } else {
      draw = true;
    }

    await saveBattle(winner, loser, draw, firstUser, secondUser);

    return {winner, loser, draw};

  } catch (error) {
    if (error.response.status === 404) {
      throw {
        type: "not_found",
        message:
          "At least one of the fighters does not exist, please try again",
      };
    }
  }
};

export const battleService = {
  battle,
};
