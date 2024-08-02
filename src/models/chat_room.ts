import { ChatRoomMember } from "./chat_room_member";
import { Message } from "./message";

enum SyncState {
  SYNCED = "SYNCED",
  SYNCING = "SYNCING",
  CORRUPTED = "CORRUPTED",
}

class ChatRoomSyncState {
  readonly messageSyncState: SyncState;
  readonly chatRoomManagementSyncState: SyncState;

  constructor(
    messageSyncState: SyncState,
    chatRoomManagementSyncState: SyncState
  ) {
    this.messageSyncState = messageSyncState;
    this.chatRoomManagementSyncState = chatRoomManagementSyncState;
  }
}

class ChatRoom {
  readonly id: number;
  readonly name: string;
  readonly thumbnailUrl: string;
  readonly members: ChatRoomMember[];
  readonly confirmedMessages: Message[];
  readonly failedMessages: Message[];
  readonly sendingMessages: Message[];

  constructor(
    id: number,
    name: string,
    thumbnailUrl: string,
    members: ChatRoomMember[],
    confirmedMessages: Message[],
    failedMessages: Message[],
    sendingMessages: Message[]
  ) {
    this.id = id;
    this.name = name;
    this.thumbnailUrl = thumbnailUrl;
    this.members = members;
    this.confirmedMessages = confirmedMessages;
    this.failedMessages = failedMessages;
    this.sendingMessages = sendingMessages;
  }

  static createChatRoom(): ChatRoom {
    return new ChatRoom(0, "", "", [], [], [], []);
  }
}

export { ChatRoom, ChatRoomSyncState, SyncState };
