/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../models/webSocketClient"
import { Message } from "./messages/message"
import { Event } from "../models/events/event"

class Controller {
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  onMessage(message: Message<Event>) {
    console.log(`${this.client.toString()}:\n${message.toString()}`)
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
