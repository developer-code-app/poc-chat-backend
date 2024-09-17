/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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

  async saveRoomAndMessageEvent(chatRoomId: number, event: ChatRoomEvent): Promise<void> {
    await AppDataSource.transaction(async (entityManager) => {
      const recordNumber = (await this.getLatestRoomAndMessageEventRecordNumber(chatRoomId)) + 1
      const params = {
        chatRoomId,
        recordNumber,
        eventId: event.id,
        type: event.type,
        content: eventEntityContentFromEvent(event),
        ownerRueJaiUserId: event.owner.rueJaiUserId,
        ownerRueJaiUserType: event.owner.rueJaiUserType,
      }

      await entityManager.save(RoomAndMessageEventEntity, params)
    })
  }

  async getLatestRoomAndMessageEventRecordNumber(chatRoomId: number): Promise<number> {
    const result = (await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .select("MAX(event.recordNumber)", "latestRecordNumber")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .getRawOne()) as { latestRecordNumber: number | null }

    const latestRecordNumber: number | null = result.latestRecordNumber

    return latestRecordNumber ?? 0
  }
}

export { EventRepository }
