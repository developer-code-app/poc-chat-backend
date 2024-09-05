import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { ChatRoom } from "../models/chatRoom"

const chatRoomFromEntity = (entity: ChatRoomEntity): ChatRoom => {
  const { id } = entity

  return new ChatRoom(id)
}

export { chatRoomFromEntity }
