import express, { Router, Express } from "express"
import { createRouter } from "./router"

class HttpServer {
  private _server?: Express
  private _router?: Router

  start(port: string) {
    this._server = express()
    this._router = createRouter()

    this.setupRoutes()
    this.server.listen(parseInt(port), "0.0.0.0", () => {
      // eslint-disable-next-line no-console
      console.log(`Http Server is running on http://0.0.0.0:${port}`)
    })
  }

  private setupRoutes() {
    this.server.get("/", (_, res) => {
      res.send("RueJai Chat Backend Http Server")
    })

    this.server.use("/api/ruejai-chat", this.router)
  }

  get server() {
    if (!this._server) {
      throw new Error("Http Server is not initialized")
    }

    return this._server
  }

  get router() {
    if (!this._router) {
      throw new Error("Router is not initialized")
    }

    return this._router
  }
}

const httpServer = new HttpServer()

export { httpServer }
