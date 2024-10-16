import { IsOptional, IsString } from "class-validator"
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RoomAndMessageEventEntity } from "./roomAndMessageEventEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"
import { ChatRoomMemberEntity } from "./chatRoomMemberEntity"

@Entity({
  name: "chat_rooms",
})
class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  id!: string

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

  @Column()
  @IsString()
  profileHash!: string

  get rueJaiUsers(): RueJaiUserEntity[] {
    return this.chatRoomMembers.map((chatRoomMember) => chatRoomMember.rueJaiUser)
  }
}

export { ChatRoomEntity }
