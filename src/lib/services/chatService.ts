/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppDataSource } from "../dataSource"
import { ChatRoom } from "../models/chatRoom"
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
    const chatRoomStates = await this.chatRoomRepository.getChatRoomStatesByUser(rueJaiUser)

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

    return this.chatRoomRepository.getChatRoomState(chatRoomId)
  }

  async getChatRoomMembers(chatRoomId: string) {
    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    return this.chatRoomMemberRepository.getChatRoomMembers(chatRoomId)
  }

  async getChatRoomEvents(chatRoomId: string, startAt: number) {
    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    return this.chatRoomRepository.getRoomAndMessageEvents(chatRoomId, startAt)
  }

  async createChatRoom(event: CreateRoomEvent): Promise<ChatRoom> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    const chatRoom = await this.chatRoomRepository.createChatRoom(event.name, event.thumbnailUrl)
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

    return chatRoom
  }

  async inviteMember(chatRoomId: string, event: InviteMemberEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

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

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async updateMemberRole(chatRoomId: string, event: UpdateMemberRoleEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

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

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async uninviteMember(chatRoomId: string, event: UninviteMemberEvent) {
    const { rueJaiUserId, rueJaiUserType } = event.uninvitedMember

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomMemberRepository.isChatRoomMemberExist(chatRoomId, rueJaiUserId, rueJaiUserType))) {
      throw new Error("Chatroom member not found")
    }

    await this.chatRoomMemberRepository.deleteChatRoomMember(chatRoomId, rueJaiUserId, rueJaiUserType)

    const recordedEvent = await this.chatRoomRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
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

  async editTextMessage(chatRoomId: string, event: UpdateTextMessageEvent) {
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
}

export { ChatService }
