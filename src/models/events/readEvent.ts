import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"

import { Event } from "./event"
import { Owner } from "./owner"

class ReadMessageEvent extends Event {
  @Expose({ name: "read_message_record_number" })
  @IsNumber()
  readonly readMessageRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, readMessageRecordNumber: number) {
    super(id, owner, createdAt)

    this.readMessageRecordNumber = readMessageRecordNumber
  }
}

export { ReadMessageEvent }
