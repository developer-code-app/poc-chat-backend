import { Equals, IsNumber, IsString, validateOrReject } from "class-validator"
import { Expose } from "class-transformer"

import { ChatRoomEvent } from "../../lib/models/events/chatRoomEvent"
import { IsEventSubclass } from "../../lib/models/events/validator"
import { eventFromObject } from "../../lib/parsers/eventParser"

class UnrecordedEventMessage {
  @Expose({ name: "type" })
  @IsString()
  @Equals("EVENT")
  readonly type: string

  @Expose({ name: "chat_room_id" })
  @IsNumber()
  readonly chatRoomId: number

  @Expose({ name: "payload" })
  @IsEventSubclass()
  readonly payload: ChatRoomEvent

  constructor(chatRoomId: number, payload: ChatRoomEvent) {
    this.type = "EVENT"
    this.chatRoomId = chatRoomId
    this.payload = payload
  }

  toString(): string {
    return JSON.stringify(this, null, 2)
  }
}

const unrecordedEventMessageFromObject = async (object: unknown): Promise<UnrecordedEventMessage> => {
  const { chat_room_id: chatRoomId, payload } = object as { chat_room_id: number; payload: ChatRoomEvent }

  const event = eventFromObject(payload)

  await validateOrReject(event)

  const message = new UnrecordedEventMessage(chatRoomId, event)

  await validateOrReject(message)

  return message
}
export { UnrecordedEventMessage, unrecordedEventMessageFromObject }
