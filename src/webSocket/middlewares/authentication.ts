/* eslint-disable no-console */
import WebSocket from "ws"
import { IncomingMessage } from "http"
import { WebSocketClient } from "../../lib/models/webSocketClient"
import { AuthenticationService } from "../../lib/services/authenticationService"

class AuthenticationMiddleware {
  private authenticationServer = new AuthenticationService()

  async authenticate(_: WebSocket, request: IncomingMessage): Promise<WebSocketClient | undefined> {
    try {
      const webSocketClient: WebSocketClient = await this._authenticate(request)

      console.log(`${webSocketClient.toString()}: Authenticated`)

      return webSocketClient
    } catch (error) {
      console.log(`Unauthorized: ${error}`)

      request.socket.end("HTTP/1.1 401 Unauthorized\r\n")
    }
  }

  private async _authenticate(request: IncomingMessage): Promise<WebSocketClient> {
    const token: string | undefined = request.headers.authorization

    if (!token) {
      throw new Error("Unauthorized: Token not found")
    }

    const rueJaiUser = await this.authenticationServer.authenticate(token)

    return new WebSocketClient(rueJaiUser)
  }
}

export { AuthenticationMiddleware }
