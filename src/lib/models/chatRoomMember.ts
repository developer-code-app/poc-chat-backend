import { IsEnum, IsInstance, IsNumber, validateSync } from "class-validator"
import { Expose } from "class-transformer"

import { RueJaiUser } from "./rueJaiUser"
import { ChatRoomMemberRole } from "./chatRoomMemberRole"

class ChatRoomMember {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "rue_jai_user" })
  @IsInstance(RueJaiUser)
  readonly rueJaiUser: RueJaiUser

  @Expose({ name: "role" })
  @IsEnum(ChatRoomMemberRole)
  readonly role: ChatRoomMemberRole

  @Expose({ name: "last_read_message_record_number" })
  readonly lastReadMessageRecordNumber: number | undefined

  constructor(id: number, rueJaiUser: RueJaiUser, role: ChatRoomMemberRole, lastReadMessageRecordNumber?: number) {
    this.id = id
    this.rueJaiUser = rueJaiUser
    this.role = role
    this.lastReadMessageRecordNumber = lastReadMessageRecordNumber

    const errors = validateSync(this)

    if (errors.length > 0) {
      throw new Error(errors.join(", "))
    }
  }
}

export { ChatRoomMember, ChatRoomMemberRole }
