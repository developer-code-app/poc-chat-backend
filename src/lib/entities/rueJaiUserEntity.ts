import { Column, Entity, JoinTable, PrimaryGeneratedColumn } from "typeorm"

import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { ChatRoomEntity } from "./chatRoomEntity"
import { RueJaiUserRole } from "../models/rueJaiUserRole"
import { ChatRoomMemberEntity } from "./chatRoomMemberEntity"

@Entity({
  name: "rue_jai_users",
})
class RueJaiUserEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @Column()
  @IsString()
  rueJaiUserId!: string

  @Column({
    type: "enum",
    enum: RueJaiUserType,
    default: RueJaiUserType.RUE_JAI_APP_USER,
  })
  @IsEnum(RueJaiUserType)
  rueJaiUserType!: RueJaiUserType

  @Column({
    type: "enum",
    enum: RueJaiUserRole,
    default: RueJaiUserRole.HOME_OWNER,
  })
  @IsEnum(RueJaiUserRole)
  rueJaiUserRole!: RueJaiUserRole

  @Column()
  @IsString()
  name!: string

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string

  @JoinTable({ name: "chat_room_members" })
  chatRoomMembers!: ChatRoomMemberEntity[]

  get chatRooms(): ChatRoomEntity[] {
    return this.chatRoomMembers.map((chatRoomMember) => chatRoomMember.chatRoom)
  }
}

export { RueJaiUserEntity }
