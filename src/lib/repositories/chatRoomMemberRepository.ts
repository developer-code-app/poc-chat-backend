import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { AppDataSource } from "../dataSource"
import { ChatRoomMemberEntity } from "../entities/chatRoomMemberEntity"
import { RueJaiUserEntity } from "../entities/rueJaiUserEntity"
import { ChatRoomMember, ChatRoomMemberRole } from "../models/chatRoomMember"
import { RueJaiUserType } from "../models/rueJaiUserType"

class ChatRoomMemberRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async isChatRoomMemberExist(
    chatRoomId: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType
  ): Promise<boolean> {
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).findOne({
      where: { chatRoom: { id: chatRoomId }, rueJaiUser: { rueJaiUserId, rueJaiUserType } },
    })

    return !!chatRoomMemberEntity
  }

  async getChatRoomMember(
    chatRoomId: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType
  ): Promise<ChatRoomMember> {
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).findOneOrFail({
      where: { chatRoom: { id: chatRoomId }, rueJaiUser: { rueJaiUserId, rueJaiUserType } },
    })

    return new ChatRoomMember(
      chatRoomMemberEntity.id,
      chatRoomMemberEntity.rueJaiUser,
      chatRoomMemberEntity.role,
      chatRoomMemberEntity.lastReadMessageRecordNumber
    )
  }

  async createChatRoomMember(
    chatRoomId: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    role: ChatRoomMemberRole,
    lastReadMessageRecordNumber?: number
  ): Promise<ChatRoomMember> {
    const rueJaiUser = await AppDataSource.getRepository(RueJaiUserEntity).findOneOrFail({
      where: { rueJaiUserId, rueJaiUserType },
    })
    const params = {
      chatRoom: {
        id: chatRoomId,
      },
      rueJaiUser: {
        id: rueJaiUser.id,
      },
      role,
      lastReadMessageRecordNumber,
    }

    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).save(params)

    return new ChatRoomMember(
      chatRoomMemberEntity.id,
      chatRoomMemberEntity.rueJaiUser,
      chatRoomMemberEntity.role,
      chatRoomMemberEntity.lastReadMessageRecordNumber
    )
  }

  async updateChatRoomMember(
    chatRoomId: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    params: {
      role?: ChatRoomMemberRole
      lastReadMessageRecordNumber?: number
    }
  ): Promise<void> {
    const { role, lastReadMessageRecordNumber } = params
    const updateParams: QueryDeepPartialEntity<ChatRoomMemberEntity> = {}

    if (role !== undefined) {
      updateParams.role = role
    }

    if (lastReadMessageRecordNumber !== undefined) {
      updateParams.lastReadMessageRecordNumber = lastReadMessageRecordNumber
    }

    await AppDataSource.getRepository(ChatRoomMemberEntity).update(
      { chatRoom: { id: chatRoomId }, rueJaiUser: { rueJaiUserId, rueJaiUserType } },
      updateParams
    )
  }

  async deleteChatRoomMember(chatRoomId: number, rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<void> {
    const chatRoomMemberEntity = await this.getChatRoomMember(chatRoomId, rueJaiUserId, rueJaiUserType)

    await AppDataSource.getRepository(ChatRoomMemberEntity).delete(chatRoomMemberEntity)
  }
}

export { ChatRoomMemberRepository }
