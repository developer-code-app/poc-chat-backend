import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { EventType } from "../models/events/eventType"
import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsDate, IsEnum, IsNumber, IsObject, IsString } from "class-validator"
import { ChatRoomEntity } from "./chatRoomEntity"

@Entity({
  name: "room_and_message_events",
})
class RoomAndMessageEventEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  id!: string

  @Index()
  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.roomAndMessageEvents, { nullable: false })
  chatRoom!: ChatRoomEntity

  @Column()
  @IsNumber()
  recordNumber!: number

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  @IsDate()
  recordedAt!: Date

  @Column()
  @IsString()
  eventId!: string

  @Column({
    type: "enum",
    enum: EventType,
  })
  @IsEnum(EventType)
  type!: EventType

  @Column({ type: "json", nullable: true })
  @IsObject()
  content: unknown

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  @IsDate()
  createdAt!: Date

  @Column()
  @IsString()
  ownerRueJaiUserId!: string

  @Column()
  @IsEnum(RueJaiUserType)
  ownerRueJaiUserType!: RueJaiUserType
}

export { RoomAndMessageEventEntity }
