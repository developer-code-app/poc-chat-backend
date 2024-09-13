/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../lib/models/webSocketClient"
import { Message } from "./messages/message"
import { ChatRoomEvent } from "../lib/models/events/chatRoomEvent"
import { EventType } from "../lib/models/events/eventType"
import { ChatService } from "../lib/chatService"
import { InviteMemberEvent, RemoveMemberEvent } from "../lib/models/events/roomEvent"
import {
  CreateFileMessageEvent,
  CreatePhotoMessageEvent,
  CreateTextMessageEvent,
  CreateTextReplyMessageEvent,
  CreateVideoMessageEvent,
  DeleteMessageEvent,
  UpdateTextMessageEvent,
} from "../lib/models/events/messageEvent"
import { ReadMessageEvent } from "../lib/models/events/readEvent"

class Controller {
  private chatService: ChatService = new ChatService()
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  async onMessage(message: Message<ChatRoomEvent>) {
    console.log(`Received Message from ${this.client.toString()}:\n${message.toString()}`)

    const chatRoomId = message.chatRoomId

    switch (message.payload.type) {
      case EventType.CREATE_ROOM:
        throw new Error("Not Implemented")
      case EventType.INVITE_MEMBER:
        await this.chatService.inviteMember(chatRoomId, message.payload as InviteMemberEvent)
        break
      case EventType.EDIT_MEMBER_ROLE:
        await this.chatService.editTextMessage(chatRoomId, message.payload as UpdateTextMessageEvent)
        break
      case EventType.REMOVE_MEMBER:
        await this.chatService.removeMember(chatRoomId, message.payload as RemoveMemberEvent)
        break
      case EventType.CREATE_TEXT_MESSAGE:
        await this.chatService.createTextMessage(chatRoomId, message.payload as CreateTextMessageEvent)
        break
      case EventType.CREATE_TEXT_REPLY_MESSAGE:
        await this.chatService.createTextReplyMessage(chatRoomId, message.payload as CreateTextReplyMessageEvent)
        break
      case EventType.CREATE_PHOTO_MESSAGE:
        await this.chatService.createPhotoMessage(chatRoomId, message.payload as CreatePhotoMessageEvent)
        break
      case EventType.CREATE_VIDEO_MESSAGE:
        await this.chatService.createVideoMessage(chatRoomId, message.payload as CreateVideoMessageEvent)
        break
      case EventType.CREATE_FILE_MESSAGE:
        await this.chatService.createFileMessage(chatRoomId, message.payload as CreateFileMessageEvent)
        break
      case EventType.EDIT_TEXT_MESSAGE:
        await this.chatService.editTextMessage(chatRoomId, message.payload as UpdateTextMessageEvent)
        break
      case EventType.DELETE_MESSAGE:
        await this.chatService.deleteMessage(chatRoomId, message.payload as DeleteMessageEvent)
        break
      case EventType.READ_MESSAGE:
        await this.chatService.readMessage(chatRoomId, message.payload as ReadMessageEvent)
        break
      default:
        console.log("Unknown Event")
    }
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
