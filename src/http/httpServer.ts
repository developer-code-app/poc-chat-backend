import express from "express"
import { createRouter } from "./router"

const HTTP_PORT: string = process.env.HTTP_PORT ?? "3000"

class HttpServer {
  start() {
    const app = express()
    const router = createRouter()

    app.get("/", (_, res) => {
      res.send("RueJai Chat Backend Http Server")
    })

    app.use("/api/ruejai-chat", router)

    app.listen(HTTP_PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${HTTP_PORT}`)
    })
  }
}

export { HttpServer }
