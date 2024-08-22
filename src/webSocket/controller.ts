/* eslint-disable no-console */
import WebSocket from "ws"

import { WebSocketClient } from "../models/web_socket_client"

class Controller {
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  onMessage(message: string) {
    console.log(`Received message from ${this.client.toString()}: ${message}`)
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
