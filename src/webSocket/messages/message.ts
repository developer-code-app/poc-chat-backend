import { IsNumber, IsString, validateOrReject } from "class-validator"

import { ChatRoomEvent } from "../../lib/models/events/chatRoomEvent"
import { eventFromObject } from "../../lib/parsers/eventParser"

class Message<T> {
  @IsString()
  readonly type: string

  @IsNumber()
  readonly chatRoomId: number

  readonly payload: T

  constructor(type: string, chatRoomId: number, payload: T) {
    this.type = type
    this.chatRoomId = chatRoomId
    this.payload = payload
  }

  toString(): string {
    return JSON.stringify(this, null, 2)
  }
}

const messageFromObject = async (obj: unknown): Promise<Message<ChatRoomEvent>> => {
  const { type, chat_room_id: chatRoomId, payload } = obj as { type: string; chat_room_id: number; payload: unknown }

  switch (type) {
    case "EVENT": {
      const event = eventFromObject(payload)
      const message = new Message<ChatRoomEvent>(type, chatRoomId, event)

      await validateOrReject(message)

      return message
    }
    default:
      throw new Error("Invalid message type")
  }
}

export { Message, messageFromObject }
