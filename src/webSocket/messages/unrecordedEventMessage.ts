import { Equals, IsNumber, IsString } from "class-validator"
import { Expose } from "class-transformer"

import { ChatRoomEvent } from "../../lib/models/events/chatRoomEvent"

class UnrecordedEventMessage {
  @Expose({ name: "type" })
  @IsString()
  @Equals("EVENT")
  readonly type: string

  @Expose({ name: "chat_room_id" })
  @IsNumber()
  readonly chatRoomId: number

  @Expose({ name: "payload" })
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

export { UnrecordedEventMessage }
