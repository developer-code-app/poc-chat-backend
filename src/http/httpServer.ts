import express from "express"
import { createRouter } from "./router"

const PORT = process.env.PORT ?? "3000"

class HttpServer {
  start() {
    const app = express()
    const router = createRouter()

    app.get("/", (_, res) => {
      res.send("RueJai Chat Backend Http Server")
    })

    app.use("/api/ruejai-chat", router)

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  }
}

export { HttpServer }
