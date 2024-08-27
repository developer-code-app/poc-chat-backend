import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"

class ChatRoom {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  constructor(id: number) {
    this.id = id
  }
}

export { ChatRoom }
