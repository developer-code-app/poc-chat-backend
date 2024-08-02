import { RueJaiUser } from "./rue_jai_user";

enum ChatRoomMemberRole {
  ADMIN,
  MEMBER,
}

class ChatRoomMember {
  readonly id: number;
  readonly role: ChatRoomMemberRole;
  readonly rueJaiUser: RueJaiUser;
  readonly lastReadMessageId: number;

  constructor(id: number, role: ChatRoomMemberRole, rueJaiUser: RueJaiUser, lastReadMessageId: number) {
    this.id = id;
    this.role = role;
    this.rueJaiUser = rueJaiUser;
    this.lastReadMessageId = lastReadMessageId;
  }
}

export { ChatRoomMember, ChatRoomMemberRole };
