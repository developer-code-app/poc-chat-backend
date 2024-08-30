/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../models/webSocketClient"
import { Message } from "./messages/message"
import { Event } from "../models/events/event"
import { WebSocketServer } from "./webSocketServer"

class Controller {
  private server: WebSocketServer
  private connection: WebSocket
  private client: WebSocketClient

  constructor(server: WebSocketServer, connection: WebSocket, client: WebSocketClient) {
    this.server = server
    this.connection = connection
    this.client = client
  }

  onMessage(message: Message<Event>) {
    console.log(`${this.client.toString()}:\n${message.toString()}`)

    this.broadcast(message)
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }

  private broadcast(message: Message<Event>) {
    const otherClients = this.server.connections.filter((connection) => !connection.client.isEquals(this.client))

    otherClients.forEach((connection) => {
      connection.send(message.toString())
    })
  }
}

export { Controller }
