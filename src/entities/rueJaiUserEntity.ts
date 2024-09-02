import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsEnum, IsNumber, IsString } from "class-validator"

@Entity()
class RueJaiUserEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number

  @Column()
  @IsString()
  rueJaiUserId: string

  @Column()
  @IsEnum(RueJaiUserType)
  rueJaiUserType: RueJaiUserType

  @Column()
  @IsString()
  thumbnailUrl: string

  constructor(id: number, rueJaiUserId: string, rueJaiUserType: RueJaiUserType, thumbnailUrl: string) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
    this.thumbnailUrl = thumbnailUrl
  }
}

export { RueJaiUserEntity }
