import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { AppDataSource } from "../dataSource"
import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { ChatRoom } from "../models/chatRoom"
import { RueJaiUser } from "../models/rueJaiUser"
import { RoomAndMessageEventEntity } from "../entities/roomAndMessageEventEntity"
import { ChatRoomEvent } from "../models/events/chatRoomEvent"
import { RecordedEvent } from "../models/events/recordedEvent"
import { eventFromEntity, eventEntityContentFromEvent } from "../parsers/eventParser"

class ChatRoomRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async isChatRoomExist(chatRoomId: string): Promise<boolean> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOne({
      where: { id: chatRoomId },
    })

    return !!chatRoomEntity
  }

  async getChatRoom(chatRoomId: string): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOneOrFail({
      where: { id: chatRoomId },
    })

    return new ChatRoom(
      chatRoomEntity.id,
      chatRoomEntity.name,
      chatRoomEntity.profileHash,
      chatRoomEntity.thumbnailUrl ? chatRoomEntity.thumbnailUrl : undefined
    )
  }

  async getChatRoomsByUser(rueJaiUser: RueJaiUser): Promise<ChatRoom[]> {
    const chatRoomRepository = AppDataSource.getRepository(ChatRoomEntity)

    const chatRoomEntities = await chatRoomRepository
      .createQueryBuilder("chatRoom")
      .leftJoinAndSelect("chatRoom.chatRoomMembers", "chatRoomMember")
      .leftJoinAndSelect("chatRoomMember.rueJaiUser", "rueJaiUser")
      .where("rueJaiUser.id = :rueJaiUserId", { rueJaiUserId: rueJaiUser.id })
      .getMany()

    return chatRoomEntities.map(
      (chatRoomEntity) =>
        new ChatRoom(
          chatRoomEntity.id,
          chatRoomEntity.name,
          chatRoomEntity.profileHash,
          chatRoomEntity.thumbnailUrl ? chatRoomEntity.thumbnailUrl : undefined
        )
    )
  }

  async createChatRoom(name: string, profileHash: string, thumbnailUrl?: string): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).save({
      name,
      thumbnailUrl,
      profileHash,
    })

    return new ChatRoom(
      chatRoomEntity.id,
      chatRoomEntity.name,
      chatRoomEntity.profileHash,
      chatRoomEntity.thumbnailUrl ? chatRoomEntity.thumbnailUrl : undefined
    )
  }

  async updateChatRoomBasicInfo(
    chatRoomId: string,
    params: {
      name?: string
      thumbnailUrl?: string
    }
  ) {
    const { name, thumbnailUrl } = params
    const updateParams: QueryDeepPartialEntity<ChatRoomEntity> = {}

    if (name !== undefined) {
      updateParams.name = name
    }

    if (thumbnailUrl !== undefined) {
      updateParams.thumbnailUrl = thumbnailUrl
    }

    await AppDataSource.getRepository(ChatRoomEntity).update(chatRoomId, updateParams)
  }

  async updateChatRoomProfileHash(chatRoomId: string, profileHash: string): Promise<void> {
    await AppDataSource.getRepository(ChatRoomEntity).update(chatRoomId, {
      profileHash,
    })
  }

  async deleteChatRoom(chatRoomId: string) {
    await AppDataSource.getRepository(ChatRoomEntity).delete(chatRoomId)
  }

  async getRoomAndMessageEvents(chatRoomId: string, startAt: number): Promise<RecordedEvent[]> {
    const roomAndMessageEventEntities = await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .andWhere("event.recordNumber > :startAt", { startAt })
      .orderBy("event.recordNumber", "ASC")
      .getMany()

    return roomAndMessageEventEntities.map((entity) => eventFromEntity(entity))
  }

  async saveRoomAndMessageEvent(chatRoomId: string, event: ChatRoomEvent): Promise<RecordedEvent> {
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

  async getLatestRoomAndMessageEventRecordNumber(chatRoomId: string): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const result = (await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .select("MAX(event.recordNumber)", "latestRecordNumber")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .getRawOne()) as { latestRecordNumber: number | null }

    const latestRecordNumber: number | null = result.latestRecordNumber

    return latestRecordNumber ?? 0
  }
}

export { ChatRoomRepository }
