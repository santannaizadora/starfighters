import connection from "../database.js";

const findFighterByUserName = async (userName: string) => {
    const query = `
        SELECT * FROM fighters
        WHERE username = $1
    `;
    const result = await connection.query(query, [userName]);
    return result.rows[0];
}

const createFighter = async (userName: string) => {
    const query = `
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, 0, 0, 0)
        `;
    await connection.query(query, [userName]);
}

const updateWins = async (userName: string) => {
    const query = `
        UPDATE fighters
        SET wins = wins + 1
        WHERE username = $1
    `;
    await connection.query(query, [userName]);
}

const updateLosses = async (userName: string) => {
    const query = `
        UPDATE fighters
        SET losses = losses + 1
        WHERE username = $1
    `;
    await connection.query(query, [userName]);
}

const updateDraws = async (userName: string) => {
    const query = `
        UPDATE fighters
        SET draws = draws + 1
        WHERE username = $1
    `;
    await connection.query(query, [userName]);
}

export const battleRepository = {
    findFighterByUserName,
    createFighter,
    updateWins,
    updateLosses,
    updateDraws
}