/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Expose } from "class-transformer"
import { IsDate, IsInstance, IsNumber } from "class-validator"

import { Owner } from "./owner"

abstract class Event {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "owner" })
  @IsInstance(Owner)
  readonly owner: Owner

  @Expose({ name: "created_at" })
  @IsDate()
  readonly createdAt: Date

  constructor(id: number, owner: Owner, createdAt: Date) {
    this.id = id
    this.owner = owner
    this.createdAt = createdAt
  }
}

export { Event }
