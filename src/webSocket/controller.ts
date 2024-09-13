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
        console.log("Invite Member")
        await this.chatService.inviteMember(chatRoomId, message.payload as InviteMemberEvent)
        console.log("Invite Member Done")
        break
      case EventType.EDIT_MEMBER_ROLE:
        console.log("Edit Member Role")
        await this.chatService.editTextMessage(chatRoomId, message.payload as UpdateTextMessageEvent)
        console.log("Edit Member Role Done")
        break
      case EventType.REMOVE_MEMBER:
        console.log("Remove Member")
        await this.chatService.removeMember(chatRoomId, message.payload as RemoveMemberEvent)
        console.log("Remove Member Done")
        break
      case EventType.CREATE_TEXT_MESSAGE:
        console.log("Create Text Message")
        await this.chatService.createTextMessage(chatRoomId, message.payload as CreateTextMessageEvent)
        console.log("Create Text Message Done")
        break
      case EventType.CREATE_TEXT_REPLY_MESSAGE:
        console.log("Create Text Reply Message")
        await this.chatService.createTextReplyMessage(chatRoomId, message.payload as CreateTextReplyMessageEvent)
        console.log("Create Text Reply Message Done")
        break
      case EventType.CREATE_PHOTO_MESSAGE:
        console.log("Create Photo Message")
        await this.chatService.createPhotoMessage(chatRoomId, message.payload as CreatePhotoMessageEvent)
        console.log("Create Photo Message Done")
        break
      case EventType.CREATE_VIDEO_MESSAGE:
        console.log("Create Video Message")
        await this.chatService.createVideoMessage(chatRoomId, message.payload as CreateVideoMessageEvent)
        console.log("Create Video Message Done")
        break
      case EventType.CREATE_FILE_MESSAGE:
        console.log("Create File Message")
        await this.chatService.createFileMessage(chatRoomId, message.payload as CreateFileMessageEvent)
        console.log("Create File Message Done")
        break
      case EventType.EDIT_TEXT_MESSAGE:
        console.log("Edit Text Message")
        await this.chatService.editTextMessage(chatRoomId, message.payload as UpdateTextMessageEvent)
        console.log("Edit Text Message Done")
        break
      case EventType.DELETE_MESSAGE:
        console.log("Delete Message")
        await this.chatService.deleteMessage(chatRoomId, message.payload as DeleteMessageEvent)
        console.log("Delete Message Done")
        break
      case EventType.READ_MESSAGE:
        console.log("Read Message")
        await this.chatService.readMessage(chatRoomId, message.payload as ReadMessageEvent)
        console.log("Read Message Done")
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
