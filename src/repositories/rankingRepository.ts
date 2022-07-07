import connection from "../database.js";

const ranking = async () => {
  const query = `
    SELECT *
    FROM fighters
    ORDER BY wins DESC, draws DESC, losses 
  `;
  const result = await connection.query(query);
  return result.rows;
}

export const rankingRepository = {
  ranking
}
