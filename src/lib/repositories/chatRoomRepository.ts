import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { AppDataSource } from "../dataSource"
import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { ChatRoom } from "../models/chatRoom"
import { RueJaiUserType } from "../models/rueJaiUserType"

class ChatRoomRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async createChatRoom(name: string, thumbnailUrl?: string): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).save({
      name,
      thumbnailUrl,
    })

    return new ChatRoom(chatRoomEntity.id)
  }

  async getChatRoom(chatRoomId: number): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOne({
      where: { id: chatRoomId },
    })

    if (!chatRoomEntity) {
      throw new Error("Chat room not found")
    }

    return new ChatRoom(chatRoomEntity.id)
  }

  async updateChatRoom(
    chatRoomId: number,
    params: {
      name?: string
      thumbnailUrl?: string
      rueJaiUserIds?: { rueJaiUserId: string; rueJaiUserType: RueJaiUserType }[]
    }
  ) {
    const { name, thumbnailUrl, rueJaiUserIds } = params
    const updateParams: QueryDeepPartialEntity<ChatRoomEntity> = {}

    if (name !== undefined) {
      updateParams.name = name
    }

    if (thumbnailUrl !== undefined) {
      updateParams.thumbnailUrl = thumbnailUrl
    }

    if (rueJaiUserIds !== undefined) {
      updateParams.rueJaiUsers = rueJaiUserIds
    }

    await AppDataSource.getRepository(ChatRoomEntity).update(chatRoomId, updateParams)
  }

  async deleteChatRoom(chatRoomId: number) {
    await AppDataSource.getRepository(ChatRoomEntity).delete(chatRoomId)
  }
}

export { ChatRoomRepository }
