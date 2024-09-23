/* eslint-disable no-console */
import { WebSocket } from "ws"

import { WebSocketClient } from "../lib/models/webSocketClient"
import { EventType } from "../lib/models/events/eventType"
import { ChatService } from "../lib/services/chatService"
import { InviteMemberEvent, RemoveMemberEvent, UpdateMemberRoleEvent } from "../lib/models/events/roomEvent"
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
import { UnrecordedEventMessage } from "./messages/unrecordedEventMessage"

class Controller {
  private chatService: ChatService = new ChatService()
  private connection: WebSocket
  private client: WebSocketClient

  constructor(connection: WebSocket, client: WebSocketClient) {
    this.connection = connection
    this.client = client
  }

  async onMessage(message: UnrecordedEventMessage) {
    const chatRoomId = message.chatRoomId

    switch (message.payload.type) {
      case EventType.CREATE_ROOM:
        throw new Error("Not Implemented")
      case EventType.INVITE_MEMBER: {
        const inviteMemberEvent = message.payload as InviteMemberEvent

        await this.chatService.inviteMember(chatRoomId, inviteMemberEvent)

        console.log(`${this.client} invited ${inviteMemberEvent.invitedMember} to ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.EDIT_MEMBER_ROLE: {
        const updateMemberRoleEvent = message.payload as UpdateMemberRoleEvent

        await this.chatService.updateMemberRole(chatRoomId, updateMemberRoleEvent)

        console.log(`${this.client} updated -> ${updateMemberRoleEvent.updatedMember} ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.REMOVE_MEMBER: {
        const removeMemberEvent = message.payload as RemoveMemberEvent

        await this.chatService.removeMember(chatRoomId, removeMemberEvent)

        console.log(`${this.client} removed ${removeMemberEvent.removedMember} from ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.CREATE_TEXT_MESSAGE: {
        const createTextMessageEvent = message.payload as CreateTextMessageEvent

        await this.chatService.createTextMessage(chatRoomId, createTextMessageEvent)

        console.log(`${this.client} created text message in ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.CREATE_TEXT_REPLY_MESSAGE: {
        const createTextReplyMessageEvent = message.payload as CreateTextReplyMessageEvent

        await this.chatService.createTextReplyMessage(chatRoomId, createTextReplyMessageEvent)

        console.log(`${this.client} created text reply message in ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.CREATE_PHOTO_MESSAGE: {
        const createPhotoMessageEvent = message.payload as CreatePhotoMessageEvent

        await this.chatService.createPhotoMessage(chatRoomId, createPhotoMessageEvent)

        console.log(`${this.client} created photo message in ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.CREATE_VIDEO_MESSAGE: {
        const createVideoMessageEvent = message.payload as CreateVideoMessageEvent

        await this.chatService.createVideoMessage(chatRoomId, createVideoMessageEvent)

        console.log(`${this.client} created video message in ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.CREATE_FILE_MESSAGE: {
        const createFileMessageEvent = message.payload as CreateFileMessageEvent

        await this.chatService.createFileMessage(chatRoomId, createFileMessageEvent)

        console.log(`${this.client} created file message in ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.EDIT_TEXT_MESSAGE: {
        const updateTextMessageEvent = message.payload as UpdateTextMessageEvent

        await this.chatService.editTextMessage(chatRoomId, updateTextMessageEvent)

        console.log(`${this.client} updated text message in ChatRoom: ${chatRoomId}`)

        break
      }
      case EventType.DELETE_MESSAGE: {
        const deleteMessageEvent = message.payload as DeleteMessageEvent

        await this.chatService.deleteMessage(chatRoomId, deleteMessageEvent)

        console.log(`${this.client} deleted message in ChatRoom: ${chatRoomId}`)
        break
      }
      case EventType.READ_MESSAGE: {
        const readMessageEvent = message.payload as ReadMessageEvent

        await this.chatService.readMessage(chatRoomId, readMessageEvent)

        console.log(`${this.client} read message in ChatRoom: ${chatRoomId}`)

        break
      }
      default:
        console.log("Unknown Event")
    }
  }

  onClose() {
    console.log(`${this.client.toString()}: Disconnected`)
  }
}

export { Controller }
