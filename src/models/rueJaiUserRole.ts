enum RueJaiUserRole {
  HOME_OWNER = "HOME_OWNER",
  RESIDENT = "RESIDENT",
  RENTER = "RENTER",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
}

const fromString = (str: string): RueJaiUserRole => {
  switch (str.toUpperCase()) {
    case "HOME_OWNER":
      return RueJaiUserRole.HOME_OWNER
    case "RESIDENT":
      return RueJaiUserRole.RESIDENT
    case "RENTER":
      return RueJaiUserRole.RENTER
    case "CUSTOMER_SERVICE":
      return RueJaiUserRole.CUSTOMER_SERVICE
    default:
      throw new Error("Invalid rue jai user role")
  }
}

export { RueJaiUserRole, fromString }
