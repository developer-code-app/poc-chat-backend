import express, { Router, Express } from "express"
import { createRouter } from "./router"

class HttpServer {
  private app: Express = express()
  private router: Router = createRouter()
  private port: string

  constructor(port: string) {
    this.port = port

    this.setupRoutes()
  }

  start() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Http Server is running on http://localhost:${this.port}`)
    })
  }

  private setupRoutes() {
    this.app.get("/", (_, res) => {
      res.send("RueJai Chat Backend Http Server")
    })

    this.app.use("/api/ruejai-chat", this.router)
  }
}

export { HttpServer }
