import { Expose, Type } from "class-transformer"
import { IsDate, IsEnum, IsInstance, IsString } from "class-validator"

import { Owner } from "./owner"
import { EventType } from "./eventType"

abstract class ChatRoomEvent {
  @Expose({ name: "id" })
  @IsString()
  readonly id: string

  @Expose({ name: "owner" })
  @Type(() => Owner)
  @IsInstance(Owner)
  readonly owner: Owner

  @Expose({ name: "created_at" })
  @Type(() => Date)
  @IsDate()
  readonly createdAt: Date

  @Expose({ name: "type" })
  @IsEnum(EventType)
  readonly type: EventType

  constructor(id: string, owner: Owner, createdAt: Date, type: EventType) {
    this.id = id
    this.owner = owner
    this.createdAt = createdAt
    this.type = type
  }
}

export { ChatRoomEvent }
