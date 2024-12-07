import { Request, Response } from 'express'
import { factoryAddSchool, factoryListSchools } from './factoryFunction.ts';
import { errorHandler } from './errorHandler.ts';
import { insertSql, selectSql } from './query.ts';

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

  static async listSchools(req: Request, res: Response) {
    try {
      const userCoords = await factoryListSchools(req);
      const result = await selectSql(userCoords);
      res.status(200).send(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}

export { Controllers };
