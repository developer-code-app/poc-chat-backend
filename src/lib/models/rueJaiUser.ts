import { Expose } from "class-transformer"
import { IsEnum, IsNumber, IsOptional, IsString, validateSync } from "class-validator"

import { RueJaiUserType } from "./rueJaiUserType"
import { RueJaiUserRole } from "./rueJaiUserRole"

class RueJaiUser {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "rue_jai_user_id" })
  @IsString()
  readonly rueJaiUserId: string

  @Expose({ name: "rue_jai_user_type" })
  @IsEnum(RueJaiUserType)
  readonly rueJaiUserType: RueJaiUserType

  @Expose({ name: "rue_jai_user_role" })
  @IsEnum(RueJaiUserRole)
  readonly rueJaiUserRole: RueJaiUserRole

  @Expose({ name: "name" })
  @IsString()
  readonly name: string

  @Expose({ name: "thumbnail_url" })
  @IsOptional()
  @IsString()
  readonly thumbnailUrl?: string

  constructor(
    id: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    rueJaiUserRole: RueJaiUserRole,
    name: string,
    thumbnailUrl?: string
  ) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
    this.rueJaiUserRole = rueJaiUserRole
    this.name = name
    this.thumbnailUrl = thumbnailUrl

    const errors = validateSync(this)

    if (errors.length > 0) {
      throw new Error(errors.join(", "))
    }
  }
}

export { RueJaiUser, RueJaiUserType, RueJaiUserRole }
