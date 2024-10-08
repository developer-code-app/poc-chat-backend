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

class InviteMemberEvent extends RoomEvent {
  @Expose({ name: "member" })
  @IsInstance(EventChatRoomMember)
  @Type(() => EventChatRoomMember)
  readonly invitedMember: EventChatRoomMember

  constructor(id: string, owner: Owner, createdAt: Date, invitedMember: EventChatRoomMember) {
    super(id, owner, createdAt, EventType.INVITE_MEMBER)

    this.invitedMember = invitedMember
  }
}

class UpdateMemberRoleEvent extends RoomEvent {
  @Expose({ name: "updated_member_record_number" })
  @IsNumber()
  readonly updatedMember: EventChatRoomMember

  @Expose({ name: "member_role" })
  @IsEnum(ChatRoomMemberRole)
  readonly memberRole: ChatRoomMemberRole

  constructor(
    id: string,
    owner: Owner,
    createdAt: Date,
    updatedMember: EventChatRoomMember,
    memberRole: ChatRoomMemberRole
  ) {
    super(id, owner, createdAt, EventType.EDIT_MEMBER_ROLE)

    this.updatedMember = updatedMember
    this.memberRole = memberRole
  }
}

class RemoveMemberEvent extends RoomEvent {
  @Expose({ name: "removed_member_record_number" })
  @IsNumber()
  readonly removedMember: EventChatRoomMember

  constructor(id: string, owner: Owner, createdAt: Date, removedMember: EventChatRoomMember) {
    super(id, owner, createdAt, EventType.REMOVE_MEMBER)

    this.removedMember = removedMember
  }
}

export { RoomEvent, CreateRoomEvent, InviteMemberEvent, UpdateMemberRoleEvent, RemoveMemberEvent, EventChatRoomMember }
