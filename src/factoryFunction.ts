import type { Request } from 'express'
import type { ISchool, IUserCoords } from './types.ts';
import Joi from 'joi';

const schoolBodySchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  address: Joi.string().min(5).max(500).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

const userCoordSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
})

async function factoryAddSchool(body: unknown) {
  try {
    let schoolBody: unknown = body;
    await schoolBodySchema.validateAsync(schoolBody);
    if(genericTG<ISchool>(schoolBody, ['name', 'address', 'latitude', 'longitude'])) {
      return {
        ...schoolBody,
        latitude: Number(schoolBody.latitude),
        longitude: Number(schoolBody.longitude),
      };
    } else {
      throw new Error("Not a valid body");
    }
  } catch(error) {
    throw error;
  }  
}

async function factoryListSchools(userCoord: Request) {
  try {
    let params = userCoord.params;
    await userCoordSchema.validateAsync(params);
    if(genericTG<IUserCoords>(params, ['latitude', 'longitude'])) {
      return {
        latitude: Number(params.latitude),
        longitude: Number(params.longitude),
      }
    } else {
      throw new Error("Not a valid params");
    }
  } catch (error) {
    throw error;
  }
}

//Generic typeguard
function genericTG<T extends object>(obj: unknown, keys: (keyof T)[]): obj is T {
  return obj !== null && typeof obj === 'object' && keys.every(key => key in obj);
}

export { factoryAddSchool, factoryListSchools };
