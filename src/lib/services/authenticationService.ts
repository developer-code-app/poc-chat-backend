import { fromString } from "../models/rueJaiUserType"
import { RueJaiUserRepository } from "../repositories/rueJaiUserRepository"

class AuthenticationService {
  private rueJaiUserRepository = new RueJaiUserRepository()

  async authenticate(token: string): Promise<boolean> {
    const credentials = token.split(" ")[1].split(":")

    if (!credentials[0] || !credentials[1]) {
      return false
    }

    const rueJaiUserId = credentials[0]
    const rueJaiUserType = fromString(credentials[1])

    return this.rueJaiUserRepository.isRueJaiUserExist(rueJaiUserId, rueJaiUserType)
  }
}

export { AuthenticationService }
