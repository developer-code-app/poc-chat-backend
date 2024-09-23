/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ChatRoomEvent } from "../models/events/chatRoomEvent"
import { AppDataSource } from "../dataSource"
import { RoomAndMessageEventEntity } from "../entities/roomAndMessageEventEntity"
import { eventEntityContentFromEvent, eventFromEntity } from "../parsers/eventParser"
import { RecordedEvent } from "../models/events/recordedEvent"

class EventRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async getRoomAndMessageEvents(chatRoomId: number, startAt: number): Promise<RecordedEvent[]> {
    const roomAndMessageEventEntities = await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .andWhere("event.recordNumber > :startAt", { startAt })
      .orderBy("event.recordNumber", "ASC")
      .getMany()

    return roomAndMessageEventEntities.map((entity) => eventFromEntity(entity))
  }

  async saveRoomAndMessageEvent(chatRoomId: number, event: ChatRoomEvent): Promise<RecordedEvent> {
    const roomAndMessageEventEntity = await AppDataSource.transaction(async (entityManager) => {
      const recordNumber = (await this.getLatestRoomAndMessageEventRecordNumber(chatRoomId)) + 1
      const params = {
        chatRoom: {
          id: chatRoomId,
        },
        recordNumber,
        eventId: event.id,
        type: event.type,
        content: eventEntityContentFromEvent(event),
        ownerRueJaiUserId: event.owner.rueJaiUserId,
        ownerRueJaiUserType: event.owner.rueJaiUserType,
      }

      return await entityManager.save(RoomAndMessageEventEntity, params)
    })

    return eventFromEntity(roomAndMessageEventEntity)
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
