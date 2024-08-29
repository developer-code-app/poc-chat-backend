import { IsNumber, IsString, validateOrReject } from "class-validator"

import { Event } from "../../models/events/event"
import { eventFromObject } from "../../parsers/eventParser"

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

const messageFromObject = async (obj: unknown): Promise<Message<Event>> => {
  const { type, chat_room_id: chatRoomId, payload } = obj as { type: string; chat_room_id: number; payload: unknown }

  switch (type) {
    case "EVENT": {
      const event = eventFromObject(payload)
      const message = new Message<Event>(type, chatRoomId, event)

      await validateOrReject(message)

      return message
    }
    default:
      throw new Error("Invalid message type")
  }
}

export { Message, messageFromObject }
