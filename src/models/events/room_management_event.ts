/* eslint-disable @typescript-eslint/no-useless-constructor */
import { ChatRoomMemberRole } from "../chat_room_member"
import { RueJaiUserType } from "../rue_jai_user"
import { Event, Owner } from "./event"

abstract class RoomManagementEvent extends Event {
  constructor(id: number, owner: Owner, createdAt: Date) {
    super(id, owner, createdAt)
  }
}

class CreateRoomEvent extends RoomManagementEvent {
  readonly name: string
  readonly thumbnailUrl: string
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

class InviteMemberEvent extends RoomManagementEvent {
  readonly member: ChatRoomMember

  constructor(id: number, owner: Owner, createdAt: Date, member: ChatRoomMember) {
    super(id, owner, createdAt)

    this.member = member
  }
}

class UpdateMemberRoleEvent extends RoomManagementEvent {
  readonly updatedMemberRecordNumber: number
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

class RemoveMemberEvent extends RoomManagementEvent {
  readonly removedMemberRecordNumber: number

  constructor(id: number, owner: Owner, createdAt: Date, removedMemberRecordNumber: number) {
    super(id, owner, createdAt)

    this.removedMemberRecordNumber = removedMemberRecordNumber
  }
}

class ChatRoomMember {
  readonly id: number
  readonly rueJaiUserId: string
  readonly rueJaiUserType: RueJaiUserType

  constructor(id: number, rueJaiUserId: string, rueJaiUserType: RueJaiUserType) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
  }
}

export { RoomManagementEvent, CreateRoomEvent, InviteMemberEvent, UpdateMemberRoleEvent, RemoveMemberEvent }
