import { IsEnum, IsNumber, IsString } from "class-validator"
import { Expose } from "class-transformer"

import { RueJaiUserType } from "../rue_jai_user"

class ChatRoomMember {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "rue_jai_user_id" })
  @IsString()
  readonly rueJaiUserId: string

  @Expose({ name: "rue_jai_user_type" })
  @IsEnum(RueJaiUserType)
  readonly rueJaiUserType: RueJaiUserType

  constructor(id: number, rueJaiUserId: string, rueJaiUserType: RueJaiUserType) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
  }
}

export { ChatRoomMember }
