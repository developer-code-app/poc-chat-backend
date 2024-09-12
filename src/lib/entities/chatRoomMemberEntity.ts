import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { ChatRoomEntity } from "./chatRoomEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"
import { ChatRoomMemberRole } from "../models/chatRoomMemberRole"
import { IsEnum, IsNumber, IsOptional } from "class-validator"

class ChatRoomMemberEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @ManyToOne(() => RueJaiUserEntity, (rueJaiUser) => rueJaiUser.chatRoomMembers)
  rueJaiUser!: RueJaiUserEntity

  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.chatRoomMembers)
  chatRoom!: ChatRoomEntity

  @Column({
    type: "enum",
    enum: ChatRoomMemberRole,
    default: () => ChatRoomMemberRole.MEMBER,
  })
  @IsEnum(ChatRoomMemberRole)
  role!: ChatRoomMemberRole

  @Column()
  @IsOptional()
  @IsNumber()
  lastReadMessageRecordNumber: number | undefined
}

export { ChatRoomMemberEntity }
