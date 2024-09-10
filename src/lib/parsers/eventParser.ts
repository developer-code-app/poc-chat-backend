import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"

import { ChatRoomEvent } from "../models/events/chatRoomEvent"
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
import {
  CreateRoomEvent,
  InviteMemberEvent,
  RemoveMemberEvent,
  RueJaiUser,
  UpdateMemberRoleEvent,
} from "../models/events/roomEvent"
import { RecordedEvent } from "../models/events/recordedEvent"
import { RoomAndMessageEventEntity } from "../entities/roomAndMessageEventEntity"
import { Owner } from "../models/events/owner"
import { ChatRoomMember } from "../models/chatRoomMember"

const eventFromObject = (obj: unknown): ChatRoomEvent => {
  const { type } = obj as { type: string }

  const eventType: EventType = eventTypeFromString(type)
  let event: ChatRoomEvent | undefined

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

const eventFromEntity = (entity: RoomAndMessageEventEntity): RecordedEvent => {
  const { recordNumber, recordedAt, eventId, type, content, createdAt, ownerRueJaiUserId, ownerRueJaiUserType } = entity
  const eventType: EventType = eventTypeFromString(type)
  let event: ChatRoomEvent
  const owner = new Owner(ownerRueJaiUserId, ownerRueJaiUserType)

  switch (eventType) {
    case EventType.CREATE_TEXT_MESSAGE: {
      const { text } = content as { text: string }

      event = new CreateTextMessageEvent(eventId, owner, createdAt, text)

      break
    }
    case EventType.CREATE_TEXT_REPLY_MESSAGE: {
      const { text, repliedMessageAddedByEventRecordNumber } = content as {
        text: string
        repliedMessageAddedByEventRecordNumber: number
      }

      event = new CreateTextReplyMessageEvent(eventId, owner, createdAt, repliedMessageAddedByEventRecordNumber, text)

      break
    }
    case EventType.CREATE_PHOTO_MESSAGE: {
      const { urls } = content as { urls: string[] }

      event = new CreatePhotoMessageEvent(eventId, owner, createdAt, urls)

      break
    }
    case EventType.CREATE_VIDEO_MESSAGE: {
      const { url } = content as { url: string }

      event = new CreateVideoMessageEvent(eventId, owner, createdAt, url)

      break
    }
    case EventType.CREATE_FILE_MESSAGE: {
      const { url } = content as { url: string }

      event = new CreateFileMessageEvent(eventId, owner, createdAt, url)

      break
    }
    case EventType.EDIT_TEXT_MESSAGE: {
      const { text, updatedTextMessageAddedByEventRecordNumber } = content as {
        text: string
        updatedTextMessageAddedByEventRecordNumber: number
      }

      event = new UpdateTextMessageEvent(eventId, owner, createdAt, updatedTextMessageAddedByEventRecordNumber, text)

      break
    }
    case EventType.DELETE_MESSAGE: {
      const { deletedMessageAddedByEventRecordNumber } = content as { deletedMessageAddedByEventRecordNumber: number }

      event = new DeleteMessageEvent(eventId, owner, createdAt, deletedMessageAddedByEventRecordNumber)

      break
    }
    case EventType.READ_MESSAGE: {
      const { lastReadMessageAddedByEventRecordNumber } = content as { lastReadMessageAddedByEventRecordNumber: number }

      event = new ReadMessageEvent(eventId, owner, createdAt, lastReadMessageAddedByEventRecordNumber)
      break
    }
    case EventType.CREATE_ROOM: {
      const { name, thumbnailUrl, members } = content as {
        name: string
        thumbnailUrl: string
        members: ChatRoomMember[]
      }

      event = new CreateRoomEvent(eventId, owner, createdAt, name, thumbnailUrl, members)

      break
    }
    case EventType.INVITE_MEMBER: {
      const { invitedUser } = content as { invitedUser: RueJaiUser }

      event = new InviteMemberEvent(eventId, owner, createdAt, invitedUser)

      break
    }
    default:
      throw new Error(`Unknown event type`)
  }

  return new RecordedEvent(recordNumber, recordedAt, event)
}

const eventEntityContentFromEvent = (event: ChatRoomEvent): unknown => {
  switch (event.type) {
    case EventType.CREATE_TEXT_MESSAGE: {
      const { text } = event as CreateTextMessageEvent

      return { text }
    }
    case EventType.CREATE_TEXT_REPLY_MESSAGE: {
      const { text, repliedMessageAddedByEventRecordNumber } = event as CreateTextReplyMessageEvent

      return { text, repliedMessageAddedByEventRecordNumber }
    }
    case EventType.CREATE_PHOTO_MESSAGE: {
      const { urls } = event as CreatePhotoMessageEvent

      return { urls }
    }
    case EventType.CREATE_VIDEO_MESSAGE: {
      const { url } = event as CreateVideoMessageEvent

      return { url }
    }
    case EventType.CREATE_FILE_MESSAGE: {
      const { url } = event as CreateFileMessageEvent

      return { url }
    }
    case EventType.EDIT_TEXT_MESSAGE: {
      const { text } = event as UpdateTextMessageEvent

      return { text }
    }
    case EventType.DELETE_MESSAGE: {
      const { deletedMessageAddedByEventRecordNumber } = event as DeleteMessageEvent

      return { deletedMessageAddedByEventRecordNumber }
    }
    case EventType.READ_MESSAGE: {
      const { lastReadMessageAddedByEventRecordNumber } = event as ReadMessageEvent

      return { lastReadMessageAddedByEventRecordNumber }
    }
    case EventType.CREATE_ROOM: {
      const { name, thumbnailUrl, members } = event as CreateRoomEvent

      return { name, thumbnailUrl, members }
    }
    case EventType.INVITE_MEMBER: {
      const { invitedUser } = event as InviteMemberEvent

      return { invitedUser }
    }
    case EventType.EDIT_MEMBER_ROLE: {
      const { updatedMember } = event as UpdateMemberRoleEvent

      return { updatedMember }
    }
    case EventType.REMOVE_MEMBER: {
      const { removedMember } = event as RemoveMemberEvent

      return { removedMember }
    }
    default:
      throw new Error(`Unknown event type`)
  }
}

export { eventFromObject, eventFromEntity, eventEntityContentFromEvent }
