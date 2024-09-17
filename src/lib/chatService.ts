/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppDataSource } from "./dataSource"
import { ChatRoom } from "./models/chatRoom"
import {
  CreateFileMessageEvent,
  CreatePhotoMessageEvent,
  CreateTextMessageEvent,
  CreateVideoMessageEvent,
  DeleteMessageEvent,
  UpdateTextMessageEvent,
} from "./models/events/messageEvent"
import { ReadMessageEvent } from "./models/events/readEvent"
import { CreateRoomEvent, InviteMemberEvent, RemoveMemberEvent, UpdateMemberRoleEvent } from "./models/events/roomEvent"
import { ChatRoomMemberRepository } from "./repositories/chatRoomMemberRepository"
import { ChatRoomRepository } from "./repositories/chatRoomRepository"
import { EventRepository } from "./repositories/eventRepository"
import { RueJaiUserRepository } from "./repositories/rueJaiUserRepository"

class ChatService {
  private chatRoomRepository = new ChatRoomRepository()
  private eventRepository = new EventRepository()
  private rueJaiUserRepository = new RueJaiUserRepository()
  private chatRoomMemberRepository = new ChatRoomMemberRepository()

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

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
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

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async removeMember(chatRoomId: number, event: RemoveMemberEvent) {
    const { rueJaiUserId, rueJaiUserType } = event.removedMember

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomMemberRepository.isChatRoomMemberExist(chatRoomId, rueJaiUserId, rueJaiUserType))) {
      throw new Error("Chatroom member not found")
    }

    await this.chatRoomMemberRepository.deleteChatRoomMember(chatRoomId, rueJaiUserId, rueJaiUserType)

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async createTextMessage(chatRoomId: number, event: CreateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async createTextReplyMessage(chatRoomId: number, event: CreateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async createPhotoMessage(chatRoomId: number, event: CreatePhotoMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async createVideoMessage(chatRoomId: number, event: CreateVideoMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async createFileMessage(chatRoomId: number, event: CreateFileMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async editTextMessage(chatRoomId: number, event: UpdateTextMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async deleteMessage(chatRoomId: number, event: DeleteMessageEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    if (!(await this.chatRoomRepository.isChatRoomExist(chatRoomId))) {
      throw new Error("Chat room not found")
    }

    await this.eventRepository.saveRoomAndMessageEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
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
