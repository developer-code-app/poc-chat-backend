import { Event, Owner } from "./event";

class ReadMessageEvent extends Event {
  readonly readMessageRecordNumber: number;

  constructor(
    id: number,
    owner: Owner,
    createdAt: Date,
    readMessageRecordNumber: number
  ) {
    super(id, owner, createdAt);

    this.readMessageRecordNumber = readMessageRecordNumber;
  }
}

export { ReadMessageEvent };
