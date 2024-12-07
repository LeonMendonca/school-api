import express from 'express';
import { Controllers } from "./controllers.js";
const router = express.Router();
router.get('/listSchool/:latitude/:longitude', Controllers.listSchools);
router.post('/addSchool', Controllers.createSchool);
export { router };