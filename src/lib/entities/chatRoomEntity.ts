import { IsNumber, IsOptional, IsString } from "class-validator"
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RoomAndMessageEventEntity } from "./roomAndMessageEventEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"

@Entity()
class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @Column()
  @IsString()
  name!: string

  @Column()
  @IsOptional()
  @IsString()
  thumbnailUrl: string | undefined

  @OneToMany(() => RoomAndMessageEventEntity, (roomAndMessageEvent) => roomAndMessageEvent.chatRoom)
  roomAndMessageEvents!: RoomAndMessageEventEntity[]

  @ManyToMany(() => RueJaiUserEntity, (rueJaiUser) => rueJaiUser.chatRooms)
  @JoinTable()
  rueJaiUsers!: RueJaiUserEntity[]
}

export { ChatRoomEntity }
