import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { ChatRoom } from "./rueJaiChatRoomEntity"

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

  @ManyToMany(() => ChatRoom)
  @JoinTable()
  chatRooms: ChatRoom[]

  constructor(
    id: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    thumbnailUrl: string,
    chatRooms: ChatRoom[]
  ) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
    this.thumbnailUrl = thumbnailUrl
    this.chatRooms = chatRooms
  }
}

export { RueJaiUserEntity }
