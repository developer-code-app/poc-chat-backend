/* eslint-disable no-console */
import { Server, WebSocket } from "ws"

import { IncomingMessage } from "http"
import { WebSocketConnection } from "./webSocketConnection"
import { AuthenticationMiddleware } from "./middlewares/authentication"

class WebSocketServer {
  readonly connections: WebSocketConnection[] = []

  private _server: Server | undefined
  private port: string
  private authenticationMiddleware: AuthenticationMiddleware = new AuthenticationMiddleware()

  constructor(port: string) {
    this.port = port
  }

  start() {
    this.initializeWebSocketServer()
    this.setupWebSocketServer()

    // eslint-disable-next-line no-console
    console.log(`WebSocket server started at ws://localhost:${this.port}`)
  }

  private initializeWebSocketServer() {
    this._server = new Server({ port: parseInt(this.port) })
  }

  private setupWebSocketServer() {
    this.server.on("connection", this.setupWebSocketConnection)
  }

  private setupWebSocketConnection = (connection: WebSocket, request: IncomingMessage) => {
    const client = this.authenticationMiddleware.authenticate(connection, request)

    if (client) {
      this.connections.push(new WebSocketConnection(this, connection, client))
    }
  }

  private get server(): Server {
    if (!this._server) {
      throw new Error("WebSocket server is not initialized")
    }

    return this._server
  }
}

export { WebSocketServer }
