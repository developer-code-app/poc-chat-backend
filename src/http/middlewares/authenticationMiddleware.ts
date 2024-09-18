import { NextFunction, Request, Response } from "express"
import { AuthenticationService } from "../../lib/services/authenticationService"

async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.get("Authorization")
    const authenticationService = new AuthenticationService()

    if (!token) {
      return res.status(401).send("Unauthorized: Token not found") // Token is missing
    }

    await authenticationService.authenticate(token)

    next()
  } catch (error) {
    res.status(401).send(`Unauthorized: ${error}`) // Token is invalid or missing
  }
}

export { authenticationMiddleware }
