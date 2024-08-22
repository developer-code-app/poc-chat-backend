import { WebSocket } from "ws"

import { Controller } from "./controller"
import { WebSocketClient } from "../models/web_socket_client"

class WebSocketConnection {
  private connection: WebSocket
  private client: WebSocketClient
  private controller: Controller

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
    this.controller = new Controller(connection, client)

    this.setup()
  }

  setup() {
    this.connection.on("message", (message: string) => {
      this.controller.onMessage(message)
    })

    this.connection.on("close", () => {
      this.controller.onClose()
    })
  }
}

export { WebSocketConnection }
