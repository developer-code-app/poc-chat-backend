/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Event, Owner } from "./event"

abstract class MessageEvent extends Event {
  constructor(id: number, owner: Owner, createdAt: Date) {
    super(id, owner, createdAt)
  }
}

abstract class CreateMessageEvent extends MessageEvent {
  constructor(id: number, owner: Owner, createdAt: Date) {
    super(id, owner, createdAt)
  }
}

abstract class UpdateMessageEvent extends MessageEvent {
  readonly updatedMessageRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, updatedMessageRecordNumber: number) {
    super(id, owner, createdAt)

    this.updatedMessageRecordNumber = updatedMessageRecordNumber
  }
}

class CreateTextMessageEvent extends CreateMessageEvent {
  readonly text: string

  constructor(id: number, owner: Owner, createdAt: Date, text: string) {
    super(id, owner, createdAt)

    this.text = text
  }
}

class CreateTextReplyMessageEvent extends CreateMessageEvent {
  readonly repliedMessageAddedByEventRecordNumber: number
  readonly text: string

  constructor(id: number, owner: Owner, createdAt: Date, repliedMessageAddedByEventRecordNumber: number, text: string) {
    super(id, owner, createdAt)

    this.repliedMessageAddedByEventRecordNumber = repliedMessageAddedByEventRecordNumber
    this.text = text
  }
}

class CreatePhotoMessageEvent extends CreateMessageEvent {
  readonly urls: string[]

  constructor(id: number, owner: Owner, createdAt: Date, urls: string[]) {
    super(id, owner, createdAt)

    this.urls = urls
  }
}

class CreateVideoMessageEvent extends CreateMessageEvent {
  readonly url: string

  constructor(id: number, owner: Owner, createdAt: Date, url: string) {
    super(id, owner, createdAt)

    this.url = url
  }
}

class CreateFileMessageEvent extends CreateMessageEvent {
  readonly url: string

  constructor(id: number, owner: Owner, createdAt: Date, url: string) {
    super(id, owner, createdAt)

    this.url = url
  }
}

class CreateMiniAppMessageEvent extends CreateMessageEvent {
  constructor(id: number, owner: Owner, createdAt: Date) {
    super(id, owner, createdAt)
  }
}

class UpdateTextMessageEvent extends UpdateMessageEvent {
  readonly text?: string

  constructor(id: number, owner: Owner, createdAt: Date, updatedMessageRecordNumber: number, text?: string) {
    super(id, owner, createdAt, updatedMessageRecordNumber)

    this.text = text
  }
}

class DeleteMessageEvent extends MessageEvent {
  readonly deletedMessageRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, deletedMessageRecordNumber: number) {
    super(id, owner, createdAt)

    this.deletedMessageRecordNumber = deletedMessageRecordNumber
  }
}

export {
  MessageEvent,
  CreateMessageEvent,
  UpdateMessageEvent,
  CreateTextMessageEvent,
  CreateTextReplyMessageEvent,
  CreatePhotoMessageEvent,
  CreateVideoMessageEvent,
  CreateFileMessageEvent,
  CreateMiniAppMessageEvent,
  UpdateTextMessageEvent,
  DeleteMessageEvent,
}
