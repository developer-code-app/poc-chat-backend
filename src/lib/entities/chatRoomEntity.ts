import { IsNumber } from "class-validator"
import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class ChatRoomEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number
}

export { ChatRoomEntity }
