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

  async isChatRoomMemberExist(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<boolean> {
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity)
      .createQueryBuilder("member")
      .leftJoinAndSelect("member.rueJaiUser", "rueJaiUser")
      .where("member.rueJaiUserId = :rueJaiUserId AND member.rueJaiUserType = :rueJaiUserType", {
        rueJaiUserId,
        rueJaiUserType,
      })
      .getOne()

    return !!chatRoomMemberEntity
  }

  async getChatRoomMember(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<ChatRoomMember> {
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity)
      .createQueryBuilder("member")
      .leftJoinAndSelect("member.rueJaiUser", "rueJaiUser")
      .where("member.rueJaiUserId = :rueJaiUserId AND member.rueJaiUserType = :rueJaiUserType", {
        rueJaiUserId,
        rueJaiUserType,
      })
      .getOneOrFail()

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
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).save({
      chatRoomId,
      rueJaiUser,
      role,
      lastReadMessageRecordNumber,
    })

    return new ChatRoomMember(
      chatRoomMemberEntity.id,
      chatRoomMemberEntity.rueJaiUser,
      chatRoomMemberEntity.role,
      chatRoomMemberEntity.lastReadMessageRecordNumber
    )
  }

  async updateChatRoomMember(
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
      { rueJaiUser: { rueJaiUserId, rueJaiUserType } },
      updateParams
    )
  }

  async deleteChatRoomMember(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<void> {
    const chatRoomMemberEntity = await this.getChatRoomMember(rueJaiUserId, rueJaiUserType)

    await AppDataSource.getRepository(ChatRoomMemberEntity).delete(chatRoomMemberEntity)
  }
}

export { ChatRoomMemberRepository }
