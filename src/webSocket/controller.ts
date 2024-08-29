/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../models/webSocketClient"

class Controller {
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  onMessage(json: unknown) {
    console.log(`${this.client.toString()}: ${json as string}`)
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
