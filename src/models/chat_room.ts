import { ReadMessageEvent } from "./event/read_event";
import { RoomManagementEvent } from "./event/room_management_event";

class ChatRoom {
  readonly id: number;
  readonly roomManagementEvents: RoomManagementEvent[];
  readonly messageEvents: MessageEvent[];
  readonly readEvents: ReadMessageEvent[];

  constructor(
    id: number,
    roomManagementEvents: RoomManagementEvent[],
    messageEvents: MessageEvent[],
    readEvents: ReadMessageEvent[]
  ) {
    this.id = id;
    this.roomManagementEvents = roomManagementEvents;
    this.messageEvents = messageEvents;
    this.readEvents = readEvents;
  }
}

export { ChatRoom };
