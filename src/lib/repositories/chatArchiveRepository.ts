import { ChatRoomEvent } from "../models/events/chatRoomEvent"
import { AppDataSource } from "../dataSource"
import { CreateRoomEvent, InviteMemberEvent, RemoveMemberEvent } from "../models/events/roomEvent"
import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { RoomAndMessageEventEntity } from "../entities/roomAndMessageEventEntity"
import { ChatRoom } from "../models/chatRoom"
import { RueJaiUserEntity } from "../entities/rueJaiUserEntity"
import { eventEntityContentFromEvent } from "../parsers/eventParser"

class ChatArchiveRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async createChatRoom(event: CreateRoomEvent): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.transaction(async (entityManager) => {
      const chatRoomEntity = await entityManager.save(new ChatRoomEntity())

      await this.saveChatRoomEvent(chatRoomEntity.id, event)

      return chatRoomEntity
    })

    return new ChatRoom(chatRoomEntity.id)
  }

  async addMemberChatRoom(chatRoomId: number, event: InviteMemberEvent): Promise<void> {
    await AppDataSource.transaction(async (entityManager) => {
      const invitedRueJaiUserEntity = await entityManager.findOne(RueJaiUserEntity, {
        where: { rueJaiUserId: event.invitedUser.rueJaiUserId, rueJaiUserType: event.invitedUser.rueJaiUserType },
      })

      if (!invitedRueJaiUserEntity) {
        throw new Error("Invited RueJai user not found")
      }

      const chatRoomEntity = await entityManager.findOneBy(ChatRoomEntity, { id: chatRoomId })

      if (!chatRoomEntity) {
        throw new Error("Chat room not found")
      }

      invitedRueJaiUserEntity.chatRooms.push(chatRoomEntity)

      await entityManager.save(invitedRueJaiUserEntity)

      await this.saveChatRoomEvent(chatRoomId, event)
    })
  }

  async removeMemberChatRoom(chatRoomId: number, event: RemoveMemberEvent): Promise<void> {
    await AppDataSource.transaction(async (entityManager) => {
      const removedMemberRueJaiUserEntity = await entityManager.findOne(RueJaiUserEntity, {
        where: { rueJaiUserId: event.removedMember.rueJaiUserId, rueJaiUserType: event.removedMember.rueJaiUserType },
      })

      if (!removedMemberRueJaiUserEntity) {
        throw new Error("Removed RueJai user not found")
      }

      const chatRoomEntity = await entityManager.findOneBy(ChatRoomEntity, { id: chatRoomId })

      if (!chatRoomEntity) {
        throw new Error("Chat room not found")
      }

      removedMemberRueJaiUserEntity.chatRooms = removedMemberRueJaiUserEntity.chatRooms.filter(
        (chatRoom) => chatRoom.id !== chatRoomId
      )

      await this.saveChatRoomEvent(chatRoomId, event)
    })
  }

  async saveChatRoomEvent(chatRoomId: number, event: ChatRoomEvent): Promise<void> {
    await AppDataSource.transaction(async (entityManager) => {
      const recordNumber = (await this.latestRoomAndMessageEventRecordNumber(chatRoomId)) + 1
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

  async latestRoomAndMessageEventRecordNumber(chatRoomId: number): Promise<number> {
    const latestRecordNumber = (await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .select("MAX(event.recordNumber)")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .getRawOne()) as number | null

    return latestRecordNumber ?? 0
  }
}

export { ChatArchiveRepository }
