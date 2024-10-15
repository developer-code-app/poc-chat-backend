import { Expose, Type } from "class-transformer"
import { IsEnum, IsInstance, IsNumber, IsOptional, IsString } from "class-validator"

import { ChatRoomMemberRole } from "../chatRoomMember"
import { ChatRoomEvent } from "./chatRoomEvent"
import { Owner } from "./owner"
import { RueJaiUserType } from "../rueJaiUserType"
import { EventType } from "./eventType"

class EventChatRoomMember {
  @Expose({ name: "role" })
  @IsEnum(ChatRoomMemberRole)
  readonly role: ChatRoomMemberRole

  @Expose({ name: "rue_jai_user_id" })
  @IsString()
  readonly rueJaiUserId: string

  @Expose({ name: "rue_jai_user_type" })
  @IsEnum(RueJaiUserType)
  readonly rueJaiUserType: RueJaiUserType

  constructor(role: ChatRoomMemberRole, rueJaiUserId: string, rueJaiUserType: RueJaiUserType) {
    this.role = role
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
  }

  toString(): string {
    return `ID: ${this.rueJaiUserId} Type: ${this.rueJaiUserType} Role: ${this.role},`
  }
}

abstract class RoomEvent extends ChatRoomEvent {}

class CreateRoomEvent extends RoomEvent {
  @Expose({ name: "name" })
  @IsString()
  readonly name: string

  @Expose({ name: "members" })
  @IsInstance(EventChatRoomMember, { each: true })
  @Type(() => EventChatRoomMember)
  readonly members: EventChatRoomMember[]

  @Expose({ name: "thumbnail_url" })
  @IsOptional()
  @IsString()
  readonly thumbnailUrl?: string

  constructor(
    id: string,
    owner: Owner,
    createdAt: Date,
    name: string,
    members: EventChatRoomMember[],
    thumbnailUrl?: string
  ) {
    super(id, owner, createdAt, EventType.CREATE_ROOM)

    this.name = name
    this.members = members
    this.thumbnailUrl = thumbnailUrl
  }
}

class UpdateRoomEvent extends RoomEvent {
  @Expose({ name: "name" })
  @IsOptional()
  @IsString()
  readonly name?: string

  @Expose({ name: "thumbnail_url" })
  @IsOptional()
  @IsString()
  readonly thumbnailUrl?: string

  constructor(id: string, owner: Owner, createdAt: Date, name: string, thumbnailUrl?: string) {
    super(id, owner, createdAt, EventType.UPDATE_ROOM)

    this.name = name
    this.thumbnailUrl = thumbnailUrl
  }
}

class InviteMemberEvent extends RoomEvent {
  @Expose({ name: "invited_member" })
  @IsInstance(EventChatRoomMember)
  @Type(() => EventChatRoomMember)
  readonly invitedMember: EventChatRoomMember

  constructor(id: string, owner: Owner, createdAt: Date, invitedMember: EventChatRoomMember) {
    super(id, owner, createdAt, EventType.INVITE_MEMBER)

    this.invitedMember = invitedMember
  }
}

class UpdateMemberRoleEvent extends RoomEvent {
  @Expose({ name: "updated_member" })
  @IsInstance(EventChatRoomMember)
  @Type(() => EventChatRoomMember)
  readonly updatedMember: EventChatRoomMember

  @Expose({ name: "new_role" })
  @IsEnum(ChatRoomMemberRole)
  readonly memberRole: ChatRoomMemberRole

  constructor(
    id: string,
    owner: Owner,
    createdAt: Date,
    updatedMember: EventChatRoomMember,
    memberRole: ChatRoomMemberRole
  ) {
    super(id, owner, createdAt, EventType.UPDATE_MEMBER_ROLE)

    this.updatedMember = updatedMember
    this.memberRole = memberRole
  }
}

class UninviteMemberEvent extends RoomEvent {
  @Expose({ name: "uninvited_member" })
  @IsInstance(EventChatRoomMember)
  @Type(() => EventChatRoomMember)
  readonly uninvitedMember: EventChatRoomMember

  constructor(id: string, owner: Owner, createdAt: Date, uninvitedMember: EventChatRoomMember) {
    super(id, owner, createdAt, EventType.UNINVITE_MEMBER)

    this.uninvitedMember = uninvitedMember
  }
}

export {
  RoomEvent,
  CreateRoomEvent,
  UpdateRoomEvent,
  InviteMemberEvent,
  UpdateMemberRoleEvent,
  UninviteMemberEvent,
  EventChatRoomMember,
}
