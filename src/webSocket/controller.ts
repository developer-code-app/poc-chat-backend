/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../lib/models/webSocketClient"
import { Message } from "./messages/message"
import { InviteMemberEvent } from "../lib/models/events/roomEvent"
import { ChatRoomEvent } from "../lib/models/events/chatRoomEvent"

class Controller {
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  onMessage(message: Message<ChatRoomEvent>) {
    const event = message.payload

    if (event instanceof InviteMemberEvent) {
      const invitedMember = event.member

      console.log(`${this.client.toString()}: Invited ${JSON.stringify(invitedMember, null, 2)}`)
    } else {
      console.log(`${this.client.toString()}:\n${message.toString()}`)
    }
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
