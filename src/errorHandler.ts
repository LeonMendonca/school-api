import type { Request, Response } from 'express'

function errorHandler(error: unknown, req: Request, res: Response) {
  if(error instanceof Error) {
    res.status(400).send(`Bad Request! ${error.name}: ${error.message}`);
  } else {
    res.status(500).send("Server Internal Error! Got an unhandled Error");
  }
}

export { errorHandler };
