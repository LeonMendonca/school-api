import sql from 'mysql2/promise';
//loadEnvFile('.env');

let conn;
async function connectSql() {
  try {
    conn = await sql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DB,
      password: process.env.PASSWORD
    });
    console.log("Connected!");
  } catch (error) {
    throw error;
  }
}
export { connectSql, conn };