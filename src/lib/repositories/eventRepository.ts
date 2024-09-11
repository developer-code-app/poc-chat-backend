import { ChatRoomEvent } from "../models/events/chatRoomEvent"
import { AppDataSource } from "../dataSource"

import { RoomAndMessageEventEntity } from "../entities/roomAndMessageEventEntity"
import { eventEntityContentFromEvent } from "../parsers/eventParser"

class EventRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async saveChatRoomEvent(chatRoomId: number, event: ChatRoomEvent): Promise<void> {
    await AppDataSource.transaction(async (entityManager) => {
      const recordNumber = (await this.getLatestRoomAndMessageEventRecordNumber(chatRoomId)) + 1
      const content = eventEntityContentFromEvent(event)

      await entityManager.save(RoomAndMessageEventEntity, {
        chatRoomId,
        recordNumber,
        eventId: event.id,
        type: event.type,
        content,
      })
    })
  }

  async getLatestRoomAndMessageEventRecordNumber(chatRoomId: number): Promise<number> {
    const latestRecordNumber = (await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .select("MAX(event.recordNumber)")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .getRawOne()) as number | null

    return latestRecordNumber ?? 0
  }
}

export { EventRepository }
