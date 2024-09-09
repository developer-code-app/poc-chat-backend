import { webSocketServer } from "../../webSocket/webSocketServer"

class BroadcastingRepository {
  constructor() {
    if (!webSocketServer.isActive()) {
      throw new Error("WebSocket server is not active")
    }
  }

  broadcastMessage(message: string) {
    webSocketServer.connections.forEach((client) => {
      client.send(message)
    })
  }
}

export { BroadcastingRepository }
