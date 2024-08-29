import { Expose, Type } from "class-transformer"
import { IsDate, IsInstance, IsNumber } from "class-validator"

import { Owner } from "./owner"

class Event {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "owner" })
  @Type(() => Owner)
  @IsInstance(Owner)
  readonly owner: Owner

  @Expose({ name: "created_at" })
  @Type(() => Date)
  @IsDate()
  readonly createdAt: Date

  constructor(id: number, owner: Owner, createdAt: Date) {
    this.id = id
    this.owner = owner
    this.createdAt = createdAt
  }
}

export { Event }
