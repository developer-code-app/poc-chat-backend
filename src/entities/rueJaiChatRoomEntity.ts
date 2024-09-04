import { IsNumber, IsString } from "class-validator"
import { Column, PrimaryGeneratedColumn } from "typeorm"

class ChatRoom {
  @PrimaryGeneratedColumn()
  @IsString()
  id: string

  @Column()
  @IsNumber()
  chatRoomId: number

  constructor(id: string, chatRoomId: number) {
    this.id = id
    this.chatRoomId = chatRoomId
  }
}

export { ChatRoom }
