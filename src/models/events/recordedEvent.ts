import { IsDate, IsNumber } from "class-validator"
import { Expose } from "class-transformer"

import { Event } from "./event"
import { IsEventSubclass } from "./validator"

class RecordedEvent {
  @Expose({ name: "record_number" })
  @IsNumber()
  readonly recordNumber: number

  @Expose({ name: "recorded_at" })
  @IsDate()
  readonly recordedAt: Date

  @Expose({ name: "event" })
  @IsEventSubclass()
  readonly event: Event

  constructor(recordNumber: number, recordedAt: Date, event: Event) {
    this.recordNumber = recordNumber
    this.recordedAt = recordedAt
    this.event = event
  }
}

export { RecordedEvent }
