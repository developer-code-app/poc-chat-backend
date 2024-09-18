/* eslint-disable no-console */
import { NextFunction, Response, Request } from "express"

const errorHandlingMiddleware = (error: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(`Error Occurred: ${error.message}`)

  res.status(500).json({ error: "Internal Server Error" })
}

export { errorHandlingMiddleware }
