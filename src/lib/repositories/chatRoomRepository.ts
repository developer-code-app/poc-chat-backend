import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { AppDataSource } from "../dataSource"
import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { ChatRoom } from "../models/chatRoom"

class ChatRoomRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async isChatRoomExist(chatRoomId: number): Promise<boolean> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOne({
      where: { id: chatRoomId },
    })

    return !!chatRoomEntity
  }

  async getChatRoom(chatRoomId: number): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOneOrFail({
      where: { id: chatRoomId },
    })

    return new ChatRoom(chatRoomEntity.id)
  }
  async createChatRoom(name: string, thumbnailUrl?: string): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).save({
      name,
      thumbnailUrl,
    })

    return new ChatRoom(chatRoomEntity.id)
  }

  async updateChatRoom(
    chatRoomId: number,
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

  async deleteChatRoom(chatRoomId: number) {
    await AppDataSource.getRepository(ChatRoomEntity).delete(chatRoomId)
  }
}

export { ChatRoomRepository }
