import { factoryAddSchool, factoryListSchools } from "./factoryFunction.js";
import { errorHandler } from "./errorHandler.js";
import { insertSql, selectSql } from "./query.js";
class Controllers {
  static async createSchool(req, res) {
    try {
      const schoolBody = await factoryAddSchool(req.body);
      const result = await insertSql(schoolBody);
      res.status(201).json(result);
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
  static async listSchools(req, res) {
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