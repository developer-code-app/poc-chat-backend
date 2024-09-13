import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"

import { ChatRoomEvent } from "./chatRoomEvent"
import { Owner } from "./owner"
import { EventType } from "./eventType"

class ReadMessageEvent extends ChatRoomEvent {
  @Expose({ name: "read_message_record_number" })
  @IsNumber()
  readonly lastReadMessageAddedByEventRecordNumber: number

  constructor(id: string, owner: Owner, createdAt: Date, lastReadMessageAddedByEventRecordNumber: number) {
    super(id, owner, createdAt)

    this.lastReadMessageAddedByEventRecordNumber = lastReadMessageAddedByEventRecordNumber
  }

  get type() {
    return EventType.READ_MESSAGE
  }
}

export { ReadMessageEvent }
