/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppDataSource } from "../dataSource"
import { ChatRoom } from "../models/chatRoom"
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
  RemoveMemberEvent,
  UpdateMemberRoleEvent,
} from "../models/events/roomEvent"
import { RueJaiUser } from "../models/rueJaiUser"
import { ChatRoomMemberRepository } from "../repositories/chatRoomMemberRepository"
import { ChatRoomRepository } from "../repositories/chatRoomRepository"
import { EventRepository } from "../repositories/eventRepository"
import { RueJaiUserRepository } from "../repositories/rueJaiUserRepository"
import { BroadcastingService } from "./broadcastingService"

class ChatService {
  private broadcastingService = new BroadcastingService()

  private chatRoomRepository = new ChatRoomRepository()
  private eventRepository = new EventRepository()
  private rueJaiUserRepository = new RueJaiUserRepository()
  private chatRoomMemberRepository = new ChatRoomMemberRepository()

  async getChatRooms(rueJaiUser: RueJaiUser): Promise<ChatRoom[]> {
    return this.chatRoomRepository.getChatRoomsByUser(rueJaiUser)
  }

  async getChatRoomLatestEventRecordInfo(chatRoomId: number): Promise<number> {
    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    return this.eventRepository.getLatestRoomAndMessageEventRecordNumber(chatRoomId)
  }

  async createChatRoom(event: CreateRoomEvent): Promise<ChatRoom> {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    const chatRoom = await this.chatRoomRepository.createChatRoom(event.name, event.thumbnailUrl)
    await this.eventRepository.saveRoomAndMessageEvent(chatRoom.id, event)

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

  async inviteMember(chatRoomId: number, event: InviteMemberEvent) {
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

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async updateMemberRole(chatRoomId: number, event: UpdateMemberRoleEvent) {
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

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async removeMember(chatRoomId: number, event: RemoveMemberEvent) {
    const { rueJaiUserId, rueJaiUserType } = event.removedMember

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomMemberRepository.isChatRoomMemberExist(chatRoomId, rueJaiUserId, rueJaiUserType))) {
      throw new Error("Chatroom member not found")
    }

    await this.chatRoomMemberRepository.deleteChatRoomMember(chatRoomId, rueJaiUserId, rueJaiUserType)

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createTextMessage(chatRoomId: number, event: CreateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createTextReplyMessage(chatRoomId: number, event: CreateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createPhotoMessage(chatRoomId: number, event: CreatePhotoMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createVideoMessage(chatRoomId: number, event: CreateVideoMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async createFileMessage(chatRoomId: number, event: CreateFileMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async editTextMessage(chatRoomId: number, event: UpdateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async deleteMessage(chatRoomId: number, event: DeleteMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    const recordedEvent = await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()

    await this.broadcastingService.broadcastChatRoomEvent(chatRoomId, recordedEvent)
  }

  async readMessage(chatRoomId: number, event: ReadMessageEvent) {
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
