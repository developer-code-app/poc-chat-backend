enum RueJaiUserType {
  RUE_JAI_ADMIN = "RUE_JAI_ADMIN",
  RUE_JAI_APP_USER = "RUE_JAI_APP_USER",
}

const fromString = (str: string): RueJaiUserType => {
  switch (str.toLocaleUpperCase()) {
    case "RUE_JAI_ADMIN":
      return RueJaiUserType.RUE_JAI_ADMIN
    case "RUE_JAI_APP_USER":
      return RueJaiUserType.RUE_JAI_APP_USER
    default:
      throw new Error("Invalid rue jai user type")
  }
}

export { RueJaiUserType, fromString }
