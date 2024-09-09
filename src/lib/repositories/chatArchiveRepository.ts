import { ChatRoomEvent } from "../models/events/chatRoomEvent"
import { AppDataSource } from "../dataSource"
import { CreateRoomEvent, InviteMemberEvent, RemoveMemberEvent } from "../models/events/roomEvent"
import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { RoomAndMessageEventEntity } from "../entities/roomAndMessageEventEntity"
import { EventType } from "../models/events/eventType"

class ChatArchiveRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async createChatRoom(event: CreateRoomEvent): Promise<number> {
    return await AppDataSource.transaction(async (entityManager) => {
      const chatRoom = await entityManager.save(new ChatRoomEntity())
      // const recordNumber = (await this.latestRoomAndMessageEventRecordNumber(chatRoom.id)) + 1

      await entityManager.save(RoomAndMessageEventEntity, {
        chatRoomId: chatRoom.id,
        recordNumber: 1,
        recordedAt: new Date(),
        eventId: event.id,
        type: EventType.CREATE_ROOM,
        content: {
          name: event.name,
          thumbnailUrl: event.thumbnailUrl,
          members: event.members,
        },
      })

      return chatRoom.id
    })
  }

  // addMemberChatRoom(event: InviteMemberEvent): void {
  //   // Invite member
  // }

  // removeMemberChatRoom(event: RemoveMemberEvent): void {
  //   // Remove member
  // }

  // saveChatRoomEvent(chatRoomId: number, event: ChatRoomEvent): void {
  //   // Save chat room event
  // }

  private async latestRoomAndMessageEventRecordNumber(chatRoomId: number): Promise<number> {
    const latestRecordNumber = (await AppDataSource.getRepository(RoomAndMessageEventEntity)
      .createQueryBuilder("event")
      .select("MAX(event.recordNumber)")
      .where("event.chatRoomId = :chatRoomId", { chatRoomId })
      .getRawOne()) as number | null

    return latestRecordNumber ?? 0
  }
}

export { ChatArchiveRepository }
