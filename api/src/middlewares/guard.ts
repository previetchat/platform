import { RequestHandler } from 'express'
import * as jwt from 'jsonwebtoken'
import { source } from '../config/db'
import { User } from '../entities/user.entity'

export const guard: RequestHandler = async (req: any, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }

  try {
    const payload: any = await jwt.verify(token, process.env.JWT_SECRET || '')

    if (!payload) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    const user = await source.manager.findOne(User, {
      where: {
        id: payload.id,
      },
    })

    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }
    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
