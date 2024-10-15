import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { AppDataSource } from "../dataSource"
import { ChatRoomEntity } from "../entities/chatRoomEntity"
import { ChatRoom } from "../models/chatRoom"
import { RueJaiUser } from "../models/rueJaiUser"

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

    return new ChatRoom(chatRoomEntity.id, chatRoomEntity.name, chatRoomEntity.thumbnailUrl)
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
          chatRoomEntity.thumbnailUrl ? chatRoomEntity.thumbnailUrl : undefined
        )
    )
  }

  async createChatRoom(name: string, thumbnailUrl?: string): Promise<ChatRoom> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).save({
      name,
      thumbnailUrl,
    })

    return new ChatRoom(
      chatRoomEntity.id,
      chatRoomEntity.name,
      chatRoomEntity.thumbnailUrl ? chatRoomEntity.thumbnailUrl : undefined
    )
  }

  async updateChatRoom(
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

  async deleteChatRoom(chatRoomId: string) {
    await AppDataSource.getRepository(ChatRoomEntity).delete(chatRoomId)
  }
}

export { ChatRoomRepository }
