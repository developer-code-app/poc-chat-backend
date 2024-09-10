import { AppDataSource } from "../dataSource"
import { RueJaiUserEntity } from "../entities/rueJaiUserEntity"
import { RueJaiUser } from "../models/rueJaiUser"
import { RueJaiUserRole } from "../models/rueJaiUserRole"
import { RueJaiUserType } from "../models/rueJaiUserType"

class RueJaiUserRepository {
  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("Data source is not initialized")
    }
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

  async isRueJaiUserExist(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<boolean> {
    const rueJaiUserEntity = await AppDataSource.getRepository(RueJaiUserEntity).findOne({
      where: { rueJaiUserId, rueJaiUserType },
    })

    return !!rueJaiUserEntity
  }

  async getRueJaiUser(rueJaiUserId: string, rueJaiUserType: RueJaiUserType): Promise<RueJaiUser> {
    const rueJaiUserEntity = await AppDataSource.getRepository(RueJaiUserEntity).findOne({
      where: { rueJaiUserId, rueJaiUserType },
    })

    if (!rueJaiUserEntity) {
      throw new Error(`RuaJai user not found: ID: ${rueJaiUserId}, Type: ${rueJaiUserType}`)
    }

    return new RueJaiUser(
      rueJaiUserEntity.id,
      rueJaiUserEntity.rueJaiUserId,
      rueJaiUserEntity.rueJaiUserType,
      rueJaiUserEntity.rueJaiUserRole,
      rueJaiUserEntity.name,
      rueJaiUserEntity.thumbnailUrl
    )
  }
}

export { RueJaiUserRepository }
