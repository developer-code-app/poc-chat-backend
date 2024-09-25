import { IsDate, IsNumber } from "class-validator"
import { Expose } from "class-transformer"

import { ChatRoomEvent } from "./chatRoomEvent"
import { IsEventSubclass } from "./validator"
import { EventType } from "./eventType"

class RecordedEvent {
  @Expose({ name: "record_number" })
  @IsNumber()
  readonly recordNumber: number

  @Expose({ name: "recorded_at" })
  @IsDate()
  readonly recordedAt: Date

  @Expose({ name: "event" })
  @IsEventSubclass()
  readonly event: ChatRoomEvent

  @Expose({ name: "type" })
  readonly type: EventType

  constructor(recordNumber: number, recordedAt: Date, event: ChatRoomEvent) {
    this.recordNumber = recordNumber
    this.recordedAt = recordedAt
    this.event = event
    this.type = event.type
  }
}

export { RecordedEvent }
