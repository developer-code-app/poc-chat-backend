import { IsNumber, IsOptional, IsString } from "class-validator"
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RoomAndMessageEventEntity } from "./roomAndMessageEventEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"
import { ChatRoomMemberEntity } from "./chatRoomMemberEntity"

@Entity({
  name: "chat_rooms",
})
class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @OneToMany(() => RoomAndMessageEventEntity, (roomAndMessageEvent) => roomAndMessageEvent.chatRoom)
  roomAndMessageEvents!: RoomAndMessageEventEntity[]

  @OneToMany(() => ChatRoomMemberEntity, (chatRoomMember) => chatRoomMember.chatRoom)
  @JoinTable({ name: "chat_room_members" })
  chatRoomMembers!: ChatRoomMemberEntity[]

  @Column()
  @IsString()
  name!: string

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string

  get rueJaiUsers(): RueJaiUserEntity[] {
    return this.chatRoomMembers.map((chatRoomMember) => chatRoomMember.rueJaiUser)
  }
}

export { ChatRoomEntity }
