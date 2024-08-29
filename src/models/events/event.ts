/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Expose, plainToInstance } from "class-transformer"
import { IsDate, IsInstance, IsNumber, validateSync } from "class-validator"

import { Owner } from "./owner"
import { EventType, eventTypeFromString } from "./eventType"
import {
  CreateFileMessageEvent,
  CreatePhotoMessageEvent,
  CreateTextMessageEvent,
  CreateTextReplyMessageEvent,
  CreateVideoMessageEvent,
  DeleteMessageEvent,
  UpdateTextMessageEvent,
} from "./messageEvent"
import { ReadMessageEvent } from "./readEvent"
import { CreateRoomEvent } from "./roomManagementEvent"

abstract class Event {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "owner" })
  @IsInstance(Owner)
  readonly owner: Owner

  @Expose({ name: "created_at" })
  @IsDate()
  readonly createdAt: Date

  constructor(id: number, owner: Owner, createdAt: Date) {
    this.id = id
    this.owner = owner
    this.createdAt = createdAt
  }
}

const eventFromObject = (obj: unknown): Event => {
  const { type } = obj as { type: string }

  const eventType: EventType = eventTypeFromString(type)
  let event: Event | undefined

  switch (eventType) {
    case EventType.CREATE_TEXT_MESSAGE: {
      event = plainToInstance(CreateTextMessageEvent, obj)
      break
    }
    case EventType.CREATE_TEXT_REPLY_MESSAGE: {
      event = plainToInstance(CreateTextReplyMessageEvent, obj)

      break
    }
    case EventType.CREATE_PHOTO_MESSAGE: {
      event = plainToInstance(CreatePhotoMessageEvent, obj)

      break
    }
    case EventType.CREATE_VIDEO_MESSAGE: {
      event = plainToInstance(CreateVideoMessageEvent, obj)
      break
    }
    case EventType.CREATE_FILE_MESSAGE: {
      event = plainToInstance(CreateFileMessageEvent, obj)
      break
    }
    case EventType.TEXT_EDITED: {
      event = plainToInstance(UpdateTextMessageEvent, obj)
      break
    }
    case EventType.DELETE_MESSAGE: {
      event = plainToInstance(DeleteMessageEvent, obj)
      break
    }
    case EventType.READ_MESSAGE: {
      event = plainToInstance(ReadMessageEvent, obj)
      break
    }
    case EventType.CREATE_ROOM: {
      event = plainToInstance(CreateRoomEvent, obj)
      break
    }
    default:
      throw new Error(`Unknown event type: ${type}`)
  }

  if (validateSync(event).length > 0) {
    throw new Error("Invalid event")
  }

  return event
}

export { Event, eventFromObject }
