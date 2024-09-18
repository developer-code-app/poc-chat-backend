/* eslint-disable no-console */
import { WebSocket } from "ws"

import { Controller } from "./controller"
import { WebSocketClient } from "../lib/models/webSocketClient"
import { messageFromObject } from "./messages/message"

class WebSocketConnection {
  readonly client: WebSocketClient

  private connection: WebSocket
  private controller: Controller

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
    this.controller = new Controller(connection, client)

    this.setup()
  }

  setup() {
    this.connection.on("message", (message: string) => void this.onMessage(message))

    this.connection.on("close", this.onClose)
  }

  send(message: string) {
    this.connection.send(message)
  }

  isEquals(connection: WebSocketConnection) {
    return this.client.isEquals(connection.client)
  }

  private onMessage = async (message: string) => {
    try {
      const json: unknown = JSON.parse(message)

      await this.handleJsonMessage(json)
    } catch (error: unknown) {
      console.error("Error Occurred:", error)
    }
  }

  private onClose = () => {
    console.log(`${this.client.toString()}: Disconnected`)
  }

  private async handleJsonMessage(json: unknown) {
    const message = await messageFromObject(json)

    await this.controller.onMessage(message)
  }
}

export { WebSocketConnection }
