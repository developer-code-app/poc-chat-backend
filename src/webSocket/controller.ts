/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../lib/models/webSocketClient"
import { Message } from "./messages/message"
import { ChatRoomEvent } from "../lib/models/events/chatRoomEvent"

class Controller {
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  onMessage(message: Message<ChatRoomEvent>) {
    console.log(`${this.client.toString()}:\n${message.toString()}`)
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
