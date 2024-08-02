import { NextFunction, Request, Response } from 'express'

function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.get('user-id')

  if (userId) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

export { authenticationMiddleware }
