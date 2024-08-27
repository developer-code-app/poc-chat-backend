import { IsEnum, IsInstance, IsNumber } from "class-validator"
import { Expose } from "class-transformer"

import { RueJaiUser } from "./rue_jai_user"

enum ChatRoomMemberRole {
  ADMIN,
  MEMBER,
}

class ChatRoomMember {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "role" })
  @IsEnum(ChatRoomMemberRole)
  readonly role: ChatRoomMemberRole

  @Expose({ name: "rue_jai_user" })
  @IsInstance(RueJaiUser)
  readonly rueJaiUser: RueJaiUser

  @Expose({ name: "last_read_message_record_number" })
  @IsNumber()
  readonly lastReadMessageRecordNumber: number

  constructor(id: number, role: ChatRoomMemberRole, rueJaiUser: RueJaiUser, lastReadMessageRecordNumber: number) {
    this.id = id
    this.role = role
    this.rueJaiUser = rueJaiUser
    this.lastReadMessageRecordNumber = lastReadMessageRecordNumber
  }
}

export { ChatRoomMember, ChatRoomMemberRole }
