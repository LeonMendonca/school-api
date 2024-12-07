import { Request, Response } from 'express'
import { factoryAddSchool } from './factoryFunction.ts';
import { errorHandler } from './errorHandler.ts';
import { insertSql } from './query.ts';

class Controllers {
  static async createSchool(req: Request, res: Response) {
    try {
      const schoolBody = await factoryAddSchool(req.body);
      const result = await insertSql(schoolBody)
      res.status(201).json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export { Controllers };
