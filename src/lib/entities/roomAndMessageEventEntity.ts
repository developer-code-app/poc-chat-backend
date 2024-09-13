import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { EventType } from "../models/events/eventType"
import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsDate, IsEnum, IsNumber, IsObject, IsString } from "class-validator"
import { ChatRoomEntity } from "./chatRoomEntity"

@Entity()
class RoomAndMessageEventEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  id!: string

  @Index()
  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.roomAndMessageEvents)
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

  @Column()
  @IsEnum(EventType)
  type!: EventType

  @Column({ type: "jsonb" })
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
