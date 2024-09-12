import express, { Router, Express } from "express"
import { createRouter } from "./router"

class HttpServer {
  private app: Express = express()
  private router: Router = createRouter()

  start(port: string) {
    this.setupRoutes()
    this.app.listen(parseInt(port), "0.0.0.0", () => {
      // eslint-disable-next-line no-console
      console.log(`Http Server is running on http://0.0.0.0:${port}`)
    })
  }

  private setupRoutes() {
    this.app.get("/", (_, res) => {
      res.send("RueJai Chat Backend Http Server")
    })

    this.app.use("/api/ruejai-chat", this.router)
  }
}

const httpServer = new HttpServer()

export { httpServer }
