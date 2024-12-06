import express from 'express';
import { loadEnvFile } from 'node:process'

import { connectSql } from './conn.ts'

loadEnvFile('.env');

const port = process.env.PORT ? Number(process.env.PORT) : 2000 ;
const app = express();

try {
  await connectSql();
  app.listen(port, () => {
    console.log(`App listening to port ${port}`)
  }); 
} catch (error) {
  if(error instanceof Error) {
    console.error(error.message);
  } 
  console.error(error)
}

