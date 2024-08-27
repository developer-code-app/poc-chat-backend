import { RueJaiUserType } from "../rue_jai_user"

abstract class Event {
  readonly id: number
  readonly owner: Owner
  readonly createdAt: Date

  constructor(id: number, owner: Owner, createdAt: Date) {
    this.id = id
    this.owner = owner
    this.createdAt = createdAt
  }
}

class Owner {
  readonly rueJaiUserId: string
  readonly rueJaiUserType: RueJaiUserType

  constructor(rueJaiUserId: string, rueJaiUserType: RueJaiUserType) {
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
  }
}

export { Event, Owner }
