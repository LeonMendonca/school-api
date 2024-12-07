import { client } from './conn.ts'
import type { ISchool, IUserCoords } from './types.ts';

async function createTable() {
  try {
    const query = `
    CREATE TABLE schools (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      latitude FLOAT,
      longitude FLOAT
    );`
    await client.query(query);
  } catch (error) {
    throw error;
  }
}

async function insertSql({ name, address, latitude, longitude}: ISchool) {
  try {
    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4)`;
    const values = [name, address, latitude, longitude];
    await client.query(query, values);
    return "Inserted successfully";
  } catch(error) {
    throw error;
  }
}

async function selectSql({ latitude, longitude }: IUserCoords) {
  try {
    const query = `
      SELECT id, name, address, latitude, longitude, 
      SQRT(POW(latitude - $1, 2) + POW(longitude - $2, 2)) AS distance 
      FROM schools ORDER BY distance ASC;
    `;
    const values = [latitude, longitude];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

export { insertSql, selectSql, createTable };
