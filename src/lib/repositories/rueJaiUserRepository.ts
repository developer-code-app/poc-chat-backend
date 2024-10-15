import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"
import { AppDataSource } from "../dataSource"
import { RueJaiUserEntity } from "../entities/rueJaiUserEntity"
import { RueJaiUser } from "../models/rueJaiUser"
import { RueJaiUserRole } from "../models/rueJaiUserRole"
import { RueJaiUserType } from "../models/rueJaiUserType"
import { ChatRoomEntity } from "../entities/chatRoomEntity"

class RueJaiUserRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
  }

  async isRueJaiUserExist(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<boolean> {
    const rueJaiUserEntity = await AppDataSource.getRepository(RueJaiUserEntity).findOne({
      where: { rueJaiUserId, rueJaiUserType },
    })

    return !!rueJaiUserEntity
  }

  async getRueJaiUser(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<RueJaiUser> {
    const rueJaiUserEntity = await AppDataSource.getRepository(RueJaiUserEntity).findOneOrFail({
      where: { rueJaiUserId, rueJaiUserType },
    })

    return new RueJaiUser(
      rueJaiUserEntity.id,
      rueJaiUserEntity.rueJaiUserId,
      rueJaiUserEntity.rueJaiUserType,
      rueJaiUserEntity.rueJaiUserRole,
      rueJaiUserEntity.name,
      rueJaiUserEntity.thumbnailUrl
    )
  }

  async getRueJaiUsersByChatRoom(chatRoomId: string): Promise<RueJaiUser[]> {
    const chatRoomEntity = await AppDataSource.getRepository(ChatRoomEntity).findOne({
      where: { id: chatRoomId },
      relations: ["chatRoomMembers", "chatRoomMembers.rueJaiUser"],
    })

    if (!chatRoomEntity) {
      throw new Error(`ChatRoom with id ${chatRoomId} not found`)
    }

    const rueJaiUserEntities = chatRoomEntity.chatRoomMembers.map((member) => member.rueJaiUser)

    return rueJaiUserEntities.map(
      (rueJaiUserEntity) =>
        new RueJaiUser(
          rueJaiUserEntity.id,
          rueJaiUserEntity.rueJaiUserId,
          rueJaiUserEntity.rueJaiUserType,
          rueJaiUserEntity.rueJaiUserRole,
          rueJaiUserEntity.name,
          rueJaiUserEntity.thumbnailUrl
        )
    )
  }

  async createRueJaiUser(
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    rueJaiUserRole: RueJaiUserRole,
    name: string,
    thumbnailUrl?: string
  ): Promise<RueJaiUser> {
    const rueJaiUserEntity: RueJaiUserEntity = await AppDataSource.transaction(async (entityManager) => {
      const existingRueJaiUserEntity = await entityManager.findOne(RueJaiUserEntity, {
        where: { rueJaiUserId, rueJaiUserType },
      })

      if (existingRueJaiUserEntity) {
        return existingRueJaiUserEntity
      }

      return await entityManager.save(RueJaiUserEntity, {
        rueJaiUserId,
        rueJaiUserType,
        rueJaiUserRole,
        name,
        thumbnailUrl,
      })
    })

    return new RueJaiUser(
      rueJaiUserEntity.id,
      rueJaiUserEntity.rueJaiUserId,
      rueJaiUserEntity.rueJaiUserType,
      rueJaiUserEntity.rueJaiUserRole,
      rueJaiUserEntity.name,
      rueJaiUserEntity.thumbnailUrl
    )
  }

  async updateRueJaiUser(
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    params: {
      name?: string
      thumbnailUrl?: string
      rueJaiUserRole?: RueJaiUserRole
    }
  ): Promise<void> {
    const { name, thumbnailUrl, rueJaiUserRole } = params
    const updateParams: QueryDeepPartialEntity<RueJaiUserEntity> = {}

    if (name !== undefined) {
      updateParams.name = name
    }

    if (thumbnailUrl !== undefined) {
      updateParams.thumbnailUrl = thumbnailUrl
    }

    if (rueJaiUserRole !== undefined) {
      updateParams.rueJaiUserRole = rueJaiUserRole
    }

    await AppDataSource.getRepository(RueJaiUserEntity).update({ rueJaiUserId, rueJaiUserType }, updateParams)
  }

  async deleteRueJaiUser(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<void> {
    await AppDataSource.getRepository(RueJaiUserEntity).delete({ rueJaiUserId, rueJaiUserType })
  }
}

export { RueJaiUserRepository }
