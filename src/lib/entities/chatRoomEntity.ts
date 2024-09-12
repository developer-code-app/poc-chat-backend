import { IsNumber, IsOptional, IsString } from "class-validator"
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RoomAndMessageEventEntity } from "./roomAndMessageEventEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"
import { ChatRoomMemberEntity } from "./chatRoomMemberEntity"

@Entity()
class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @OneToMany(() => RoomAndMessageEventEntity, (roomAndMessageEvent) => roomAndMessageEvent.chatRoom)
  roomAndMessageEvents!: RoomAndMessageEventEntity[]

  @ManyToMany(() => RueJaiUserEntity, (rueJaiUser) => rueJaiUser.chatRooms)
  @JoinTable()
  chatRoomMembers!: ChatRoomMemberEntity[]

  @Column()
  @IsString()
  name!: string

  @Column()
  @IsOptional()
  @IsString()
  thumbnailUrl: string | undefined

  get rueJaiUsers(): RueJaiUserEntity[] {
    return this.chatRoomMembers.map((chatRoomMember) => chatRoomMember.rueJaiUser)
  }
}

export { ChatRoomEntity }
