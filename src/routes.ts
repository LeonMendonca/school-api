import express, { Request, Response } from 'express';
import { Controllers } from './controllers.ts';

const router = express.Router();

router.post('/addSchool', Controllers.createSchool);
export { router };
