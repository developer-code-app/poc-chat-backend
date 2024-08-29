/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-console */
import { WebSocket } from "ws"

import { Controller } from "./controller"
import { WebSocketClient } from "../models/webSocketClient"

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
    this.connection.on("message", this.onMessage)

    this.connection.on("close", this.onClose)
  }

  private onMessage = (message: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json: unknown = JSON.parse(message)

      this.handleJsonMessage(json)
    } catch (_) {
      console.error("Failed to parse message as JSON")
    }
  }

  private onClose = () => {
    console.log(`${this.client.toString()}: Disconnected`)
  }

  private handleJsonMessage(json: unknown) {
    this.controller.onMessage(json)
  }
}

export { WebSocketConnection }
