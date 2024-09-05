import { Expose } from "class-transformer"
import { IsEnum, IsString } from "class-validator"

import { RueJaiUserType } from "../rueJaiUser"

class Owner {
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

  toString(): string {
    return `Owner: { rueJaiUserId: ${this.rueJaiUserId}, rueJaiUserType: ${this.rueJaiUserType} }`
  }
}

export { Owner }
