import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { EventType } from "../models/events/eventType"
import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsDate, IsEnum, IsNumber, IsObject, IsString } from "class-validator"

@Entity()
class RecordedEventEntity {
  @PrimaryGeneratedColumn()
  @IsString()
  id: string

  @Column()
  @IsNumber()
  recordNumber: number

  @Column()
  @IsDate()
  recordedAt: Date

  @Column()
  @IsNumber()
  eventId: number

  @Column()
  @IsEnum(EventType)
  type: EventType

  @Column({ type: "jsonb" })
  @IsObject()
  content: unknown

  @Column()
  @IsDate()
  createdAt: Date

  @Column()
  @IsString()
  ownerRueJaiUserId: string

  @Column()
  @IsEnum(RueJaiUserType)
  ownerRueJaiUserType: RueJaiUserType

  constructor(
    id: string,
    recordNumber: number,
    recordedAt: Date,
    eventId: number,
    type: EventType,
    content: unknown,
    createdAt: Date,
    ownerRueJaiUserId: string,
    ownerRueJaiUserType: RueJaiUserType
  ) {
    this.id = id
    this.recordNumber = recordNumber
    this.recordedAt = recordedAt
    this.eventId = eventId
    this.type = type
    this.content = content
    this.createdAt = createdAt
    this.ownerRueJaiUserId = ownerRueJaiUserId
    this.ownerRueJaiUserType = ownerRueJaiUserType
  }
}

export { RecordedEventEntity }
