import { Event } from "./event"

class RecordedEvent {
  readonly recordNumber: number
  readonly recordedAt: Date
  readonly event: Event

  constructor(recordNumber: number, recordedAt: Date, event: Event) {
    this.recordNumber = recordNumber
    this.recordedAt = recordedAt
    this.event = event
  }
}

export { RecordedEvent }
