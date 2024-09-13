import { Expose, Type } from "class-transformer"
import { IsDate, IsInstance, IsNumber, IsString } from "class-validator"

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

  constructor(id: string, owner: Owner, createdAt: Date) {
    this.id = id
    this.owner = owner
    this.createdAt = createdAt
  }

  get type(): EventType {
    throw new Error("Not implemented")
  }
}

export { ChatRoomEvent }
