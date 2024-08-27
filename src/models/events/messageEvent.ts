import { Expose } from "class-transformer"
import { Event } from "./event"
import { Owner } from "./owner"
import { IsNumber, IsString } from "class-validator"

abstract class MessageEvent extends Event {}

abstract class CreateMessageEvent extends MessageEvent {}

abstract class UpdateMessageEvent extends MessageEvent {
  @Expose({ name: "updated_message_record_number" })
  @IsNumber()
  readonly updatedMessageRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, updatedMessageRecordNumber: number) {
    super(id, owner, createdAt)

    this.updatedMessageRecordNumber = updatedMessageRecordNumber
  }
}

class CreateTextMessageEvent extends CreateMessageEvent {
  @Expose({ name: "text" })
  @IsString()
  readonly text: string

  constructor(id: number, owner: Owner, createdAt: Date, text: string) {
    super(id, owner, createdAt)

    this.text = text
  }
}

class CreateTextReplyMessageEvent extends CreateMessageEvent {
  @Expose({ name: "replied_message_added_by_event_record_number" })
  @IsNumber()
  readonly repliedMessageAddedByEventRecordNumber: number

  @Expose({ name: "text" })
  @IsString()
  readonly text: string

  constructor(id: number, owner: Owner, createdAt: Date, repliedMessageAddedByEventRecordNumber: number, text: string) {
    super(id, owner, createdAt)

    this.repliedMessageAddedByEventRecordNumber = repliedMessageAddedByEventRecordNumber
    this.text = text
  }
}

class CreatePhotoMessageEvent extends CreateMessageEvent {
  @Expose({ name: "urls" })
  @IsString({ each: true })
  readonly urls: string[]

  constructor(id: number, owner: Owner, createdAt: Date, urls: string[]) {
    super(id, owner, createdAt)

    this.urls = urls
  }
}

class CreateVideoMessageEvent extends CreateMessageEvent {
  @Expose({ name: "url" })
  @IsString()
  readonly url: string

  constructor(id: number, owner: Owner, createdAt: Date, url: string) {
    super(id, owner, createdAt)

    this.url = url
  }
}

class CreateFileMessageEvent extends CreateMessageEvent {
  @Expose({ name: "url" })
  @IsString()
  readonly url: string

  constructor(id: number, owner: Owner, createdAt: Date, url: string) {
    super(id, owner, createdAt)

    this.url = url
  }
}

class CreateMiniAppMessageEvent extends CreateMessageEvent {}

class UpdateTextMessageEvent extends UpdateMessageEvent {
  @Expose({ name: "text" })
  @IsString()
  readonly text: string

  constructor(id: number, owner: Owner, createdAt: Date, updatedMessageRecordNumber: number, text: string) {
    super(id, owner, createdAt, updatedMessageRecordNumber)

    this.text = text
  }
}

class DeleteMessageEvent extends MessageEvent {
  @Expose({ name: "deleted_message_record_number" })
  @IsNumber()
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
