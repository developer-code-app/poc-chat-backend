/* eslint-disable @typescript-eslint/no-misused-promises */

import { randomUUID } from "crypto"
import { AppDataSource } from "../dataSource"
import { ChatRoomProfile } from "../models/chatRoomProfile"
import { ChatRoomState } from "../models/chatRoomState"
import {
  CreateFileMessageEvent,
  CreatePhotoMessageEvent,
  CreateTextMessageEvent,
  CreateVideoMessageEvent,
  DeleteMessageEvent,
  UpdateTextMessageEvent,
} from "../models/events/messageEvent"
import { ReadMessageEvent } from "../models/events/readEvent"
import {
  CreateRoomEvent,
  InviteMemberEvent,
  UninviteMemberEvent,
  UpdateMemberRoleEvent,
  UpdateRoomEvent,
} from "../models/events/roomEvent"
import { RueJaiUser } from "../models/rueJaiUser"
import { ChatRoomMemberRepository } from "../repositories/chatRoomMemberRepository"
import { ChatRoomRepository } from "../repositories/chatRoomRepository"
import { RueJaiUserRepository } from "../repositories/rueJaiUserRepository"
import { BroadcastingService } from "./broadcastingService"

class ChatService {
  private broadcastingService = new BroadcastingService()

  private chatRoomRepository = new ChatRoomRepository()
  private rueJaiUserRepository = new RueJaiUserRepository()
  private chatRoomMemberRepository = new ChatRoomMemberRepository()

  async getChatRoomStates(rueJaiUser: RueJaiUser): Promise<ChatRoomState[]> {
    const chatRooms = await this.chatRoomRepository.getChatRoomsByUser(rueJaiUser)
    const chatRoomStates = await Promise.all(
      chatRooms.map(async (chatRoom) => {
        return await this.getChatRoomState(chatRoom.id, rueJaiUser)
      })
    )

    return chatRoomStates
  }

  async getChatRoomState(chatRoomId: string, rueJaiUser: RueJaiUser): Promise<ChatRoomState> {
    if (
      !(await this.chatRoomMemberRepository.isChatRoomMemberExist(
        chatRoomId,
        rueJaiUser.rueJaiUserId,
        rueJaiUser.rueJaiUserType
      ))
    ) {
      throw new Error("Unauthorized chat room access")
    }

    const [chatRoom, latestRoomAndMessageEventRecordNumber] = await Promise.all([
      this.chatRoomRepository.getChatRoom(chatRoomId),
      this.chatRoomRepository.getLatestRoomAndMessageEventRecordNumber(chatRoomId),
    ])

    return new ChatRoomState(chatRoom.id, latestRoomAndMessageEventRecordNumber, chatRoom.profileHash)
  }

  async getChatRoomProfile(chatRoomId: string, rueJaiUser: RueJaiUser): Promise<ChatRoomProfile> {
    if (
      !(await this.chatRoomMemberRepository.isChatRoomMemberExist(
        chatRoomId,
        rueJaiUser.rueJaiUserId,
        rueJaiUser.rueJaiUserType
      ))
    ) {
      throw new Error("Unauthorized chat room access")
    }

    const [chatRoom, members] = await Promise.all([
      this.chatRoomRepository.getChatRoom(chatRoomId),
      this.chatRoomMemberRepository.getChatRoomMembers(chatRoomId),
    ])

    return new ChatRoomProfile(chatRoom.id, chatRoom.name, members, chatRoom.profileHash, chatRoom.thumbnailUrl)
  }

  async getChatRoomEvents(chatRoomId: string, startAt: number, rueJaiUser: RueJaiUser) {
    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    if (
      !(await this.chatRoomMemberRepository.isChatRoomMemberExist(
        chatRoomId,
        rueJaiUser.rueJaiUserId,
        rueJaiUser.rueJaiUserType
      ))
    ) {
      throw new Error("Unauthorized chat room access")
    }

    return this.chatRoomRepository.getRoomAndMessageEvents(chatRoomId, startAt)
  }

  async createChatRoom(event: CreateRoomEvent, rueJaiUser: RueJaiUser): Promise<ChatRoomState> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    const profileHash = randomUUID().toString()
    const chatRoom = await this.chatRoomRepository.createChatRoom(event.name, profileHash, event.thumbnailUrl)
    await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoom.id, event)

    event.members.forEach(async (member) => {
      await this.chatRoomMemberRepository.createChatRoomMember(
        chatRoom.id,
        member.rueJaiUserId,
        member.rueJaiUserType,
        member.role,
        0
      )
    })

    await queryRunner.commitTransaction()

    return this.getChatRoomState(chatRoom.id, rueJaiUser)
  }

  async updateChatRoom(
    chatRoomId: string,
    event: UpdateRoomEvent | InviteMemberEvent | UpdateMemberRoleEvent | UninviteMemberEvent,
    rueJaiUser: RueJaiUser
  ): Promise<ChatRoomState> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (
      !(await this.chatRoomMemberRepository.isChatRoomMemberExist(
        chatRoomId,
        rueJaiUser.rueJaiUserId,
        rueJaiUser.rueJaiUserType
      ))
    ) {
      throw new Error("Unauthorized chat room update")
    }

    if (event instanceof UpdateRoomEvent) {
      await this.updateRoomBasicInfo(chatRoomId, event)
    } else if (event instanceof InviteMemberEvent) {
      await this.inviteMember(chatRoomId, event)
    } else if (event instanceof UpdateMemberRoleEvent) {
      await this.updateMemberRole(chatRoomId, event)
    } else if (event instanceof UninviteMemberEvent) {
      await this.uninviteMember(chatRoomId, event)
    } else {
      throw new Error("Unknown update chat room event type")
    }

    const newProfileHash = randomUUID().toString()
    await this.chatRoomRepository.updateChatRoomProfileHash(chatRoomId, newProfileHash)

    await queryRunner.commitTransaction()

    return this.getChatRoomState(chatRoomId, rueJaiUser)
  }

  async createTextMessage(chatRoomId: string, event: CreateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createTextReplyMessage(chatRoomId: string, event: CreateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createPhotoMessage(chatRoomId: string, event: CreatePhotoMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createVideoMessage(chatRoomId: string, event: CreateVideoMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createFileMessage(chatRoomId: string, event: CreateFileMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async updateTextMessage(chatRoomId: string, event: UpdateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async deleteMessage(chatRoomId: string, event: DeleteMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async readMessage(chatRoomId: string, event: ReadMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (
      !(await this.chatRoomMemberRepository.isChatRoomMemberExist(
        chatRoomId,
        event.owner.rueJaiUserId,
        event.owner.rueJaiUserType
      ))
    ) {
      throw new Error("Chatroom member not found")
    }

    await this.chatRoomMemberRepository.updateChatRoomMember(
      chatRoomId,
      event.owner.rueJaiUserId,
      event.owner.rueJaiUserType,
      {
        lastReadMessageRecordNumber: event.lastReadMessageAddedByEventRecordNumber,
      }
    )

    await queryRunner.commitTransaction()
  }

  private async updateRoomBasicInfo(chatRoomId: string, event: UpdateRoomEvent) {
    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.chatRoomRepository.updateChatRoomBasicInfo(chatRoomId, {
      name: event.name,
      thumbnailUrl: event.thumbnailUrl,
    })

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  private async inviteMember(chatRoomId: string, event: InviteMemberEvent) {
    if (
      !(await this.rueJaiUserRepository.isRueJaiUserExist(
        event.invitedMember.rueJaiUserId,
        event.invitedMember.rueJaiUserType
      ))
    ) {
      throw new Error("RueJai User not found")
    }

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.chatRoomMemberRepository.createChatRoomMember(
      chatRoomId,
      event.invitedMember.rueJaiUserId,
      event.invitedMember.rueJaiUserType,
      event.invitedMember.role,
      0
    )

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  private async updateMemberRole(chatRoomId: string, event: UpdateMemberRoleEvent) {
    if (
      !(await this.chatRoomMemberRepository.isChatRoomMemberExist(
        chatRoomId,
        event.updatedMember.rueJaiUserId,
        event.updatedMember.rueJaiUserType
      ))
    ) {
      throw new Error("Chatroom member not found")
    }

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  private async uninviteMember(chatRoomId: string, event: UninviteMemberEvent) {
    const { rueJaiUserId, rueJaiUserType } = event.uninvitedMember

    if (!(await this.chatRoomMemberRepository.isChatRoomMemberExist(chatRoomId, rueJaiUserId, rueJaiUserType))) {
      throw new Error("Chatroom member not found")
    }

    await this.chatRoomMemberRepository.deleteChatRoomMember(chatRoomId, rueJaiUserId, rueJaiUserType)

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }
}

export { ChatService }
