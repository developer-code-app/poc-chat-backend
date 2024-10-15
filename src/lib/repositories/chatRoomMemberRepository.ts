import { AppDataSource } from "../dataSource"
import { ChatRoomMemberEntity } from "../entities/chatRoomMemberEntity"
import { RueJaiUserEntity } from "../entities/rueJaiUserEntity"
import { ChatRoomMember, ChatRoomMemberRole } from "../models/chatRoomMember"
import { RueJaiUserType } from "../models/rueJaiUserType"
import { RueJaiUser } from "../models/rueJaiUser"
import { ChatRoomEntity } from "../entities/chatRoomEntity"

class ChatRoomMemberRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async isChatRoomMemberExist(
    chatRoomId: string,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType
  ): Promise<boolean> {
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).findOne({
      where: { chatRoom: { id: chatRoomId }, rueJaiUser: { rueJaiUserId, rueJaiUserType } },
    })

    return !!chatRoomMemberEntity
  }

  async getChatRoomMembers(chatRoomId: string): Promise<ChatRoomMember[]> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOne({
      where: { id: chatRoomId },
      relations: ["chatRoomMembers", "chatRoomMembers.rueJaiUser"],
    })

    if (!chatRoomEntity) {
      throw new Error(`ChatRoom with id ${chatRoomId} not found`)
    }

    const chatRoomMemberEntities = chatRoomEntity.chatRoomMembers

    return chatRoomMemberEntities.map(
      (member) =>
        new ChatRoomMember(
          member.id,
          new RueJaiUser(
            member.rueJaiUser.id,
            member.rueJaiUser.rueJaiUserId,
            member.rueJaiUser.rueJaiUserType,
            member.rueJaiUser.rueJaiUserRole,
            member.rueJaiUser.name,
            member.rueJaiUser.thumbnailUrl ? member.rueJaiUser.thumbnailUrl : undefined
          ),
          member.role, // Role in the chat room
          member.lastReadMessageRecordNumber // Last read message record number (optional)
        )
    )
  }

  async createChatRoomMember(
    chatRoomId: string,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    role: ChatRoomMemberRole,
    lastReadMessageRecordNumber?: number
  ): Promise<ChatRoomMember> {
    const rueJaiUserEntity = await AppDataSource.getRepository(RueJaiUserEntity).findOneOrFail({
      where: { rueJaiUserId, rueJaiUserType },
    })
    const params = {
      chatRoom: {
        id: chatRoomId,
      },
      rueJaiUser: {
        id: rueJaiUserEntity.id,
      },
      role,
      lastReadMessageRecordNumber,
    }

    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).save(params)
    const rueJaiUser = new RueJaiUser(
      chatRoomMemberEntity.rueJaiUser.id,
      chatRoomMemberEntity.rueJaiUser.rueJaiUserId,
      chatRoomMemberEntity.rueJaiUser.rueJaiUserType,
      chatRoomMemberEntity.rueJaiUser.rueJaiUserRole,
      chatRoomMemberEntity.rueJaiUser.name,
      chatRoomMemberEntity.rueJaiUser.thumbnailUrl
    )

    return new ChatRoomMember(
      chatRoomMemberEntity.id,
      rueJaiUser,
      chatRoomMemberEntity.role,
      chatRoomMemberEntity.lastReadMessageRecordNumber
    )
  }

  async updateChatRoomMember(
    chatRoomId: string,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    params: {
      role?: ChatRoomMemberRole
      lastReadMessageRecordNumber?: number
    }
  ): Promise<void> {
    const { role, lastReadMessageRecordNumber } = params

    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).findOneOrFail({
      where: { chatRoom: { id: chatRoomId }, rueJaiUser: { rueJaiUserId, rueJaiUserType } },
    })

    if (role !== undefined) {
      chatRoomMemberEntity.role = role
    }

    if (lastReadMessageRecordNumber !== undefined) {
      chatRoomMemberEntity.lastReadMessageRecordNumber = lastReadMessageRecordNumber
    }

    await AppDataSource.getRepository(ChatRoomMemberEntity).save(chatRoomMemberEntity)
  }

  async deleteChatRoomMember(chatRoomId: string, rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<void> {
    const chatRoomMemberEntity = await AppDataSource.getRepository(ChatRoomMemberEntity).findOneOrFail({
      where: { chatRoom: { id: chatRoomId }, rueJaiUser: { rueJaiUserId, rueJaiUserType } },
    })

    await AppDataSource.getRepository(ChatRoomMemberEntity).delete(chatRoomMemberEntity.id)
  }
}

export { ChatRoomMemberRepository }
