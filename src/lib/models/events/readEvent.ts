import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"

import { ChatRoomEvent } from "./chatRoomEvent"
import { Owner } from "./owner"

class ReadMessageEvent extends ChatRoomEvent {
  @Expose({ name: "read_message_record_number" })
  @IsNumber()
  readonly lastReadMessageAddedByEventRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, lastReadMessageAddedByEventRecordNumber: number) {
    super(id, owner, createdAt)

    this.lastReadMessageAddedByEventRecordNumber = lastReadMessageAddedByEventRecordNumber
  }
}

export { ReadMessageEvent }
