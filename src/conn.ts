import sql from 'mysql2'

async function connectSql() {
  const connection = sql.createPool({
    host: 'localhost',
    user: 'leon',
    database: 'leon'
  });
  console.log("connected!");
  connection.on('connection', (conn)=> {
    console.log(conn);
  });
}
connectSql();

export { connectSql };
