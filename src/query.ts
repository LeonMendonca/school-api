import { conn } from './conn.ts'
import type { ISchool } from './types.ts';

async function insertSql(schoolbody: ISchool) {
  try {
    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    const values = [schoolbody.name, schoolbody.address, schoolbody.latitude, schoolbody.longitude];
    const [result] = await conn.execute(query, values);
    return result;
  } catch(error) {
    throw error;
  }
}

export { insertSql };
