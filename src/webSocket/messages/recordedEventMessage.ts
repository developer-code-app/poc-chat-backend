import { Equals, IsNumber, IsString } from "class-validator"
import { Expose } from "class-transformer"

import { RecordedEvent } from "../../lib/models/events/recordedEvent"

class RecordedEventMessage {
  @Expose({ name: "type" })
  @IsString()
  @Equals("EVENT")
  readonly type: string

  @Expose({ name: "chat_room_id" })
  @IsNumber()
  readonly chatRoomId: string

  @Expose({ name: "payload" })
  readonly payload: RecordedEvent

  constructor(chatRoomId: string, payload: RecordedEvent) {
    this.type = "EVENT"
    this.chatRoomId = chatRoomId
    this.payload = payload
  }

  toString(): string {
    return JSON.stringify(this, null, 2)
  }
}

export { RecordedEventMessage }
