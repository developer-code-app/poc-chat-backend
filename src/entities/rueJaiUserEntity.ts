import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { ChatRoomEntity } from "./chatRoomEntity"
import { RueJaiUserRole } from "../models/rueJaiUserRole"

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
  @IsEnum(RueJaiUserRole)
  rueJaiUserRole: RueJaiUserRole

  @Column()
  @IsString()
  name: string

  @Column()
  @IsString()
  thumbnailUrl: string

  @ManyToMany(() => ChatRoomEntity)
  @JoinTable()
  chatRooms: ChatRoomEntity[]

  constructor(
    id: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    rueJaiUserRole: RueJaiUserRole,
    name: string,
    thumbnailUrl: string,
    chatRooms: ChatRoomEntity[]
  ) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
    this.rueJaiUserRole = rueJaiUserRole
    this.name = name
    this.thumbnailUrl = thumbnailUrl
    this.chatRooms = chatRooms
  }
}

export { RueJaiUserEntity }
