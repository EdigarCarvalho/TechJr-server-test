import * as yup from 'yup'
import { Request, Response, NextFunction } from 'express'

function verifyShape(schema: yup.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      })
      next()
    } catch (error) {
      return res.status(400).json({ message: error.errors })
    }
  }
}

export default verifyShape
