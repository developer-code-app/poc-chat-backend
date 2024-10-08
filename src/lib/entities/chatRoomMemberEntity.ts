import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { ChatRoomEntity } from "./chatRoomEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"
import { ChatRoomMemberRole } from "../models/chatRoomMemberRole"
import { IsEnum, IsNumber, IsOptional } from "class-validator"

@Entity({
  name: "chat_room_members",
})
class ChatRoomMemberEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @ManyToOne(() => RueJaiUserEntity, (rueJaiUser) => rueJaiUser.chatRoomMembers, { nullable: false })
  rueJaiUser!: RueJaiUserEntity

  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.chatRoomMembers, { nullable: false })
  chatRoom!: ChatRoomEntity

  @Column({
    type: "enum",
    enum: ChatRoomMemberRole,
    default: ChatRoomMemberRole.MEMBER,
  })
  @IsEnum(ChatRoomMemberRole)
  role!: ChatRoomMemberRole

  @Column()
  @IsOptional()
  @IsNumber()
  lastReadMessageRecordNumber?: number
}

export { ChatRoomMemberEntity }
