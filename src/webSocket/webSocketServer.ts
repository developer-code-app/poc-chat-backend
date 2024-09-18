/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
import { Server, WebSocket } from "ws"

import { IncomingMessage } from "http"
import { WebSocketConnection } from "./webSocketConnection"
import { AuthenticationMiddleware } from "./middlewares/authentication"

class WebSocketServer {
  readonly connections: WebSocketConnection[] = []

  private _server: Server | undefined
  private _authenticationMiddleware: AuthenticationMiddleware | undefined

  start(port: string) {
    this.initializeWebSocketServer(port)
    this.setupWebSocketServer()

    // eslint-disable-next-line no-console
    console.log(`WebSocket server started at ws://0.0.0.0:${port}`)
  }

  isActive(): boolean {
    return !!this._server
  }

  private initializeWebSocketServer(port: string) {
    this._server = new Server({ host: "0.0.0.0", port: parseInt(port) })
  }

  private setupWebSocketServer() {
    this._authenticationMiddleware = new AuthenticationMiddleware()
    this.server.on("connection", this.setupWebSocketConnection)
  }

  private setupWebSocketConnection = async (connection: WebSocket, request: IncomingMessage) => {
    const client = await this.authenticationMiddleware.authenticate(connection, request)

    if (client) {
      this.connections.push(new WebSocketConnection(connection, client))
    }
  }

  private get server(): Server {
    if (!this._server) {
      throw new Error("WebSocket server is not initialized")
    }

    return this._server
  }

  private get authenticationMiddleware(): AuthenticationMiddleware {
    if (!this._authenticationMiddleware) {
      throw new Error("Authentication middleware is not initialized")
    }

    return this._authenticationMiddleware
  }
}

const webSocketServer = new WebSocketServer()

export { webSocketServer }
