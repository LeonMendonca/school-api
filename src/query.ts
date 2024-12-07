import { conn } from './conn.ts'
import type { ISchool, IUserCoords } from './types.ts';

async function insertSql({ name, address, latitude, longitude}: ISchool) {
  try {
    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    const values = [name, address, latitude, longitude];
    const [result] = await conn.execute(query, values);
    return result;
  } catch(error) {
    throw error;
  }
}

async function selectSql({ latitude, longitude }: IUserCoords) {
  try {
    const query = `
      SELECT id, name, address, latitude, longitude, 
      SQRT(POW(latitude - ?, 2) + POW(longitude - ?, 2)) AS distance 
      FROM schools ORDER BY distance ASC;
    `;
    const values = [latitude, longitude];
    const [result] = await conn.execute(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

export { insertSql, selectSql };
