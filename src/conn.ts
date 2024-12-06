import sql from 'mysql2/promise'
import { loadEnvFile } from 'node:process'

loadEnvFile('.env');

async function connectSql() {
  try {
    await sql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DB,
      password: process.env.PASSWORD,
    });
    console.log("Connected!"); 
  } catch (error) {
    throw error;
  } 
}

export { connectSql };
