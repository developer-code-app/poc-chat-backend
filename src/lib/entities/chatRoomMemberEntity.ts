import { ManyToOne } from "typeorm"

import { ChatRoomEntity } from "./chatRoomEntity"
import { RueJaiUserEntity } from "./rueJaiUserEntity"

class ChatRoomMemberEntity {
  @ManyToOne(() => RueJaiUserEntity, (rueJaiUser) => rueJaiUser.chatRoomMembers)
  rueJaiUser!: RueJaiUserEntity

  @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.chatRoomMembers)
  chatRoom!: ChatRoomEntity
}

export { ChatRoomMemberEntity }
