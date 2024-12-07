import { loadEnvFile } from 'process';
import pg from 'pg';
import { createTable } from "./query.js";
loadEnvFile('.env');
let client;
async function connectSql() {
  try {
    client = new pg.Client({
      host: process.env.HOST,
      user: process.env.PGUSER,
      database: process.env.DB,
      password: process.env.PASSWORD,
      port: Number(process.env.PGPORT),
      ssl: {
        rejectUnauthorized: false
      }
    });
    await client.connect().then(async () => {
      try {
        await createTable();
        console.log("created table");
      } catch (error) {
        //catch the error and log the error, without crashing the server
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    });
    console.log("Connected!");
  } catch (error) {
    throw error;
  }
}
export { connectSql, client };