/* eslint-disable no-console */
import { Server, WebSocket } from "ws"

const WSS_PORT = process.env.WS_PORT ?? "4000"

class WebSocketServer {
  private wss: Server = new Server({ port: parseInt(WSS_PORT) })

  start() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("New client connected")

      ws.on("message", (message: string) => {
        console.log(`Received message: ${message}`)
        ws.send(`Server received your message: ${message}`)
      })

      ws.on("close", () => {
        console.log("Client disconnected")
      })
    })

    // eslint-disable-next-line no-console
    console.log(`WebSocket server started at ws://localhost:${WSS_PORT}`)
  }
}

export { WebSocketServer }
