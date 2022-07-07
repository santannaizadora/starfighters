import axios from "axios"

const battle = async (firstUser: string, secondUser:string) => {
    const response = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
    const firstUserStars = response.data.reduce((acc:Number, repo:any) => acc + repo.stargazers_count, 0);
    const response2 = await axios.get(`https://api.github.com/users/${secondUser}/repos`);
    const secondUserStars = response2.data.reduce((acc:Number, repo:any) => acc + repo.stargazers_count, 0);
    let winner = "";
    let loser = "";
    let draw = false;
    if (firstUserStars > secondUserStars) {
        winner = firstUser;
        loser = secondUser;
    } else if (firstUserStars === secondUserStars) {
        winner = null;
        loser = null;
        draw = true;
    } else {
        winner = secondUser;
        loser = firstUser;
    }

    return {
        winner,
        loser,
        draw
    };
}

export const battleService = {
    battle
}