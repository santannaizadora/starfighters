import connection from "../database.js";

const findFighterByUserName = async (userName: string) => {
    const query = `
        SELECT * FROM fighters
        WHERE username = $1
    `;
    const result = await connection.query(query, [userName]);
    return result.rows[0];
}
