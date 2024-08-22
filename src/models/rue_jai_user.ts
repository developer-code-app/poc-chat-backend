enum RueJaiUserType {
  RUE_JAI_ADMIN,
  RUE_JAI_APP_USER,
}

enum RueJaiUserRole {
  HOME_OWNER,
  RESIDENT,
  RENTER,
  CUSTOMER_SERVICE,
}

class RueJaiUser {
  readonly id: number
  readonly rueJaiUserId: string
  readonly rueJaiUserType: RueJaiUserType
  readonly rueJaiUserRole: RueJaiUserRole
  readonly name: string
  readonly thumbnailUrl: string

  constructor(
    id: number,
    rueJaiUserId: string,
    rueJaiUserType: RueJaiUserType,
    rueJaiUserRole: RueJaiUserRole,
    name: string,
    thumbnailUrl: string
  ) {
    this.id = id
    this.rueJaiUserId = rueJaiUserId
    this.rueJaiUserType = rueJaiUserType
    this.rueJaiUserRole = rueJaiUserRole
    this.name = name
    this.thumbnailUrl = thumbnailUrl
  }
}

export { RueJaiUser, RueJaiUserType, RueJaiUserRole }
