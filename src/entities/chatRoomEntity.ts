import { IsNumber } from "class-validator"
import { PrimaryGeneratedColumn } from "typeorm"

class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number

  constructor(id: number) {
    this.id = id
  }
}

export { ChatRoomEntity }
