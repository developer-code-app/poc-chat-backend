import { AppDataSource } from "./dataSource"
import { ChatRoom } from "./models/chatRoom"
import { CreateRoomEvent, InviteMemberEvent, UpdateMemberRoleEvent } from "./models/events/roomEvent"
import { ChatRoomMemberRepository } from "./repositories/chatRoomMemberRepository"
import { ChatRoomRepository } from "./repositories/chatRoomRepository"
import { EventRepository } from "./repositories/EventRepository"
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
    await this.eventRepository.saveChatRoomEvent(chatRoom.id, event)

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

    await this.eventRepository.saveChatRoomEvent(chatRoomId, event)

    await queryRunner.commitTransaction()
  }

  async updateMemberRole(_: number, _event: UpdateMemberRoleEvent) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.startTransaction()

    await queryRunner.commitTransaction()
  }
}

export { ChatService }
