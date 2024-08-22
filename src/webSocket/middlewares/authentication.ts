/* eslint-disable no-console */
import WebSocket from "ws"
import { IncomingMessage } from "http"

import { WebSocketClient } from "../../models/web_socket_client"

class AuthenticationMiddleware {
  authenticate(_: WebSocket, request: IncomingMessage): WebSocketClient | undefined {
    const webSocketClient: WebSocketClient | undefined = this._authenticate(request)

    if (webSocketClient) {
      console.log(`${webSocketClient.toString()}: Authenticated`)

      return webSocketClient
    } else {
      console.log("Unauthorized")

      request.socket.end("HTTP/1.1 401 Unauthorized\r\n")
    }
  }

  private _authenticate(request: IncomingMessage): WebSocketClient | undefined {
    const credential: string | undefined = request.headers.authorization

    console.log(request.headers.authorization)

    if (credential) {
      return new WebSocketClient(credential)
    }
  }
}

export { AuthenticationMiddleware }
