import { NextFunction, Request, Response } from "express"
import { AuthenticationService } from "../../lib/services/authenticationService"

async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get("Authorization")
    const authenticationService = new AuthenticationService()

    if (token && (await authenticationService.authenticate(token))) {
      next() // Token is valid, proceed to the next middleware
    } else {
      res.status(401).send(`Unauthorized: ${token ? token : "Token not found"}`) // Token is invalid or missing
    }
  } catch (error) {
    next(error)
  }
}

export { authenticationMiddleware }
