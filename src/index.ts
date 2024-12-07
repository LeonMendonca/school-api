import express, { Request, Response, NextFunction } from 'express';
import { loadEnvFile } from 'process'

import { connectSql } from './conn.ts'
import { router } from './routes.ts'

loadEnvFile('.env');

const port = process.env.PORT ? Number(process.env.PORT) : 2000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.use((req: Request, res: Response)=> {
  res.status(404).send(`Cannot ${req.method} ${req.originalUrl}`)
});

app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
  res.status(500).send(`Server Internal Error ${err.message}`)
});

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

