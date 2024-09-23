import { RecordedEventMessage } from "../../webSocket/messages/recordedEventMessage"
import { RecordedEvent } from "../models/events/recordedEvent"
import { BroadcastingRepository } from "../repositories/broadcastingRepository"
import { RueJaiUserRepository } from "../repositories/rueJaiUserRepository"

class BroadcastingService {
  private broadcastingRepository = new BroadcastingRepository()
  private rueJaiUserRepository = new RueJaiUserRepository()

  async broadcastChatRoomEvent(chatRoomId: number, event: RecordedEvent) {
    const rueJaiUsers = await this.rueJaiUserRepository.getRueJaiUsersByChatRoom(chatRoomId)

    const message = new RecordedEventMessage(chatRoomId, event)

    this.broadcastingRepository.broadcastRecordedEventMessage(rueJaiUsers, message)
  }
}

export { BroadcastingService }
