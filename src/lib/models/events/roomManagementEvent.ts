import { Expose, Type } from "class-transformer"
import { IsEnum, IsInstance, IsNumber, IsString } from "class-validator"

import { ChatRoomMember, ChatRoomMemberRole } from "../chatRoomMember"
import { ChatRoomEvent } from "./chatRoomEvent"
import { Owner } from "./owner"

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
  @Type(() => ChatRoomMember)
  readonly member: ChatRoomMember

  constructor(id: number, owner: Owner, createdAt: Date, member: ChatRoomMember) {
    super(id, owner, createdAt)

    this.member = member
  }
}

class UpdateMemberRoleEvent extends RoomEvent {
  @Expose({ name: "updated_member_record_number" })
  @IsNumber()
  readonly updatedMemberRecordNumber: number

  @Expose({ name: "member_role" })
  @IsEnum(ChatRoomMemberRole)
  readonly memberRole: ChatRoomMemberRole

  constructor(
    id: number,
    owner: Owner,
    createdAt: Date,
    updatedMemberRecordNumber: number,
    memberRole: ChatRoomMemberRole
  ) {
    super(id, owner, createdAt)

    this.updatedMemberRecordNumber = updatedMemberRecordNumber
    this.memberRole = memberRole
  }
}

class RemoveMemberEvent extends RoomEvent {
  @Expose({ name: "removed_member_record_number" })
  @IsNumber()
  readonly removedMemberRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, removedMemberRecordNumber: number) {
    super(id, owner, createdAt)

    this.removedMemberRecordNumber = removedMemberRecordNumber
  }
}

export {
  RoomEvent,
  CreateRoomEvent,
  InviteMemberEvent,
  UpdateMemberRoleEvent,
  RemoveMemberEvent,
}
