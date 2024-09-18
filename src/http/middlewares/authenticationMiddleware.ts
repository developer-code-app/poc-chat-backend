import { NextFunction, Request, Response } from "express"
import { AuthenticationService } from "../../lib/services/authenticationService"

async function authenticationMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.get("Authorization")
    const authenticationService = new AuthenticationService()

    if (!token) {
      res.status(401).send("Unauthorized: Token not found")
      return
    }

    const user = await authenticationService.authenticate(token)
    req.user = user // Add the user to req

    next()
  } catch (error) {
    res.status(401).send(`Unauthorized: ${error}`)
  }
}

export { authenticationMiddleware }
