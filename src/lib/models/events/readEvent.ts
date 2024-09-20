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
    super(id, owner, createdAt, EventType.READ_MESSAGE)

    this.lastReadMessageAddedByEventRecordNumber = lastReadMessageAddedByEventRecordNumber
  }
}

export { ReadMessageEvent }
