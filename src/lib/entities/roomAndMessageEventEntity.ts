import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { EventType } from "../models/events/eventType"
import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsDate, IsEnum, IsNumber, IsObject, IsString } from "class-validator"

@Entity()
class RoomAndMessageEventEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  id!: string

  @Column()
  @IsNumber()
  chatRoomId!: number

  @Column()
  @IsNumber()
  recordNumber!: number

  @Column()
  @IsDate()
  recordedAt!: Date

  @Column()
  @IsNumber()
  eventId!: number

  @Column()
  @IsEnum(EventType)
  type!: EventType

  @Column({ type: "jsonb" })
  @IsObject()
  content: unknown

  @Column()
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
