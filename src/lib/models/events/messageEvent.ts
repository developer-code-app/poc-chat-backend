import { Expose } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

import { ChatRoomEvent } from "./chatRoomEvent"
import { Owner } from "./owner"
import { EventType } from "./eventType"

abstract class MessageEvent extends ChatRoomEvent {}

abstract class CreateMessageEvent extends MessageEvent {}

abstract class UpdateMessageEvent extends MessageEvent {
  @Expose({ name: "updated_message_record_number" })
  @IsNumber()
  readonly updatedMessageAddedByEventRecordNumber: number

  constructor(
    id: string,
    owner: Owner,
    createdAt: Date,
    type: EventType,
    updatedMessageAddedByEventRecordNumber: number
  ) {
    super(id, owner, createdAt, type)

    this.updatedMessageAddedByEventRecordNumber = updatedMessageAddedByEventRecordNumber
  }
}

class CreateTextMessageEvent extends CreateMessageEvent {
  @Expose({ name: "text" })
  @IsString()
  readonly text: string

  constructor(id: string, owner: Owner, createdAt: Date, text: string) {
    super(id, owner, createdAt, EventType.CREATE_TEXT_MESSAGE)

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

  constructor(id: string, owner: Owner, createdAt: Date, repliedMessageAddedByEventRecordNumber: number, text: string) {
    super(id, owner, createdAt, EventType.CREATE_TEXT_REPLY_MESSAGE)

    this.repliedMessageAddedByEventRecordNumber = repliedMessageAddedByEventRecordNumber
    this.text = text
  }
}

class CreatePhotoMessageEvent extends CreateMessageEvent {
  @Expose({ name: "urls" })
  @IsString({ each: true })
  readonly urls: string[]

  constructor(id: string, owner: Owner, createdAt: Date, urls: string[]) {
    super(id, owner, createdAt, EventType.CREATE_PHOTO_MESSAGE)

    this.urls = urls
  }
}

class CreateVideoMessageEvent extends CreateMessageEvent {
  @Expose({ name: "url" })
  @IsString()
  readonly url: string

  constructor(id: string, owner: Owner, createdAt: Date, url: string) {
    super(id, owner, createdAt, EventType.CREATE_VIDEO_MESSAGE)

    this.url = url
  }
}

class CreateFileMessageEvent extends CreateMessageEvent {
  @Expose({ name: "url" })
  @IsString()
  readonly url: string

  constructor(id: string, owner: Owner, createdAt: Date, url: string) {
    super(id, owner, createdAt, EventType.CREATE_FILE_MESSAGE)

    this.url = url
  }
}

class UpdateTextMessageEvent extends UpdateMessageEvent {
  @Expose({ name: "text" })
  @IsString()
  readonly text: string

  constructor(id: string, owner: Owner, createdAt: Date, updatedMessageAddedByEventRecordNumber: number, text: string) {
    super(id, owner, createdAt, EventType.EDIT_TEXT_MESSAGE, updatedMessageAddedByEventRecordNumber)

    this.text = text
  }
}

class DeleteMessageEvent extends MessageEvent {
  @Expose({ name: "deleted_message_record_number" })
  @IsNumber()
  readonly deletedMessageAddedByEventRecordNumber: number

  constructor(id: string, owner: Owner, createdAt: Date, deletedMessageAddedByEventRecordNumber: number) {
    super(id, owner, createdAt, EventType.DELETE_MESSAGE)

    this.deletedMessageAddedByEventRecordNumber = deletedMessageAddedByEventRecordNumber
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
  UpdateTextMessageEvent,
  DeleteMessageEvent,
}
