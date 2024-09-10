import { Expose, Type } from "class-transformer"
import { IsEnum, IsInstance, IsNumber, IsString } from "class-validator"

import { ChatRoomMember, ChatRoomMemberRole } from "../chatRoomMember"
import { ChatRoomEvent } from "./chatRoomEvent"
import { Owner } from "./owner"
import { RueJaiUserType } from "../rueJaiUserType"
import { EventType } from "./eventType"

abstract class RoomEvent extends ChatRoomEvent {}

class CreateRoomEvent extends RoomEvent {
  @Expose({ name: "name" })
  @IsString()
  readonly name: string

  @Expose({ name: "thumbnail_url" })
  @IsString()
  readonly thumbnailUrl: string

  @Expose({ name: "members" })
  @IsInstance(ChatRoomMember, { each: true })
  @Type(() => ChatRoomMember)
  readonly members: ChatRoomMember[]

  constructor(
    id: number,
    owner: Owner,
    createdAt: Date,
    name: string,
    thumbnailUrl: string,
    members: ChatRoomMember[]
  ) {
    super(id, owner, createdAt)

    this.name = name
    this.thumbnailUrl = thumbnailUrl
    this.members = members
  }
}

class InviteMemberEvent extends RoomEvent {
  @Expose({ name: "member" })
  @IsInstance(ChatRoomMember)
  @Type(() => RueJaiUser)
  readonly invitedUser: RueJaiUser

  constructor(id: number, owner: Owner, createdAt: Date, invitedUser: RueJaiUser) {
    super(id, owner, createdAt)

    this.invitedUser = invitedUser
  }
}

class RueJaiUser {
  @Expose({ name: "rue_jai_user_id" })
  @IsString()
  readonly rueJaiUserId: string

  @Expose({ name: "rue_jai_user_type" })
  @IsEnum(RueJaiUserType)
  readonly rueJaiUserType: RueJaiUserType

  constructor(rueJaiUserId: string, rueJaiUserType: RueJaiUserType) {
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
  }
}

class UpdateMemberRoleEvent extends RoomEvent {
  @Expose({ name: "updated_member_record_number" })
  @IsNumber()
  readonly updatedMember: RueJaiUser

  @Expose({ name: "member_role" })
  @IsEnum(ChatRoomMemberRole)
  readonly memberRole: ChatRoomMemberRole

  constructor(id: number, owner: Owner, createdAt: Date, updatedMember: RueJaiUser, memberRole: ChatRoomMemberRole) {
    super(id, owner, createdAt)

    this.updatedMember = updatedMember
    this.memberRole = memberRole
  }
}

class RemoveMemberEvent extends RoomEvent {
  @Expose({ name: "removed_member_record_number" })
  @IsNumber()
  readonly removedMember: RueJaiUser

  constructor(id: number, owner: Owner, createdAt: Date, removedMember: RueJaiUser) {
    super(id, owner, createdAt)

    this.removedMember = removedMember
  }

  get type(): EventType {
    return EventType.REMOVE_MEMBER
  }
}

export { RoomEvent, CreateRoomEvent, InviteMemberEvent, UpdateMemberRoleEvent, RemoveMemberEvent, RueJaiUser }
