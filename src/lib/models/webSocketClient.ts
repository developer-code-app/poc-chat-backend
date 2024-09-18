import { RueJaiUser } from "./rueJaiUser"

class WebSocketClient {
  rueJaiUser: RueJaiUser

  constructor(rueJaiUser: RueJaiUser) {
    this.rueJaiUser = rueJaiUser
  }

  toString(): string {
    return `WebSocketClient [${this.rueJaiUser.name}]`
  }

  isEquals(client: WebSocketClient): boolean {
    return this.rueJaiUser.isEquals(client.rueJaiUser)
  }
}

export { WebSocketClient }
