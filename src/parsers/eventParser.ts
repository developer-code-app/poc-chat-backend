import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"

import { Event } from "../models/events/event"
import { EventType, eventTypeFromString } from "../models/events/eventType"
import {
  CreateFileMessageEvent,
  CreatePhotoMessageEvent,
  CreateTextMessageEvent,
  CreateTextReplyMessageEvent,
  CreateVideoMessageEvent,
  DeleteMessageEvent,
  UpdateTextMessageEvent,
} from "../models/events/messageEvent"
import { ReadMessageEvent } from "../models/events/readEvent"
import { CreateRoomEvent, InviteMemberEvent } from "../models/events/roomManagementEvent"

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
    case EventType.EDIT_TEXT_MESSAGE: {
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
    case EventType.INVITE_MEMBER: {
      event = plainToInstance(InviteMemberEvent, obj)
      break
    }
    default:
      throw new Error(`Unknown event type: ${type}`)
  }

  const validationErrors = validateSync(event)

  if (validationErrors.length > 0) {
    throw new Error(`Invalid event: ${validationErrors}`)
  }

  return event
}

export { eventFromObject }
