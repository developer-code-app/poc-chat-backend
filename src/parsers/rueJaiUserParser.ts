import { RueJaiUserEntity } from "../entities/rueJaiUserEntity"
import { RueJaiUser } from "../models/rueJaiUser"

const rueJaiUserFromEntity = (entity: RueJaiUserEntity): RueJaiUser => {
  const { id, rueJaiUserId, rueJaiUserType, rueJaiUserRole, name, thumbnailUrl } = entity

  return new RueJaiUser(id, rueJaiUserId, rueJaiUserType, rueJaiUserRole, name, thumbnailUrl)
}

export { rueJaiUserFromEntity }
