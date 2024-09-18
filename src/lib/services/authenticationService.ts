import { RueJaiUser } from "../models/rueJaiUser"
import { fromString } from "../models/rueJaiUserType"
import { RueJaiUserRepository } from "../repositories/rueJaiUserRepository"

class AuthenticationService {
  private rueJaiUserRepository = new RueJaiUserRepository()

  async authenticate(token: string): Promise<RueJaiUser> {
    const credentials = token.split(" ")[1].split(":")

    if (!credentials[0] || !credentials[1]) {
      throw new Error(`Unauthorized: Invalid token: ${token}`)
    }

    const rueJaiUserId = credentials[0]
    const rueJaiUserType = fromString(credentials[1])

    return this.rueJaiUserRepository.getRueJaiUser(rueJaiUserId, rueJaiUserType)
  }
}

export { AuthenticationService }
