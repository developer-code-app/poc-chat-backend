import { RecordedEventMessage } from "../../webSocket/messages/recordedEventMessage"
import { webSocketServer } from "../../webSocket/webSocketServer"
import { RueJaiUser } from "../models/rueJaiUser"

class BroadcastingRepository {
  constructor() {
    if (!webSocketServer.isActive()) {
      throw new Error("WebSocket server is not active")
    }
  }

  broadcastRecordedEventMessage(rueJaiUsers: RueJaiUser[], message: RecordedEventMessage) {
    const webSocketConnections = webSocketServer.connections.filter((connection) =>
      rueJaiUsers.some((rueJaiUser) => connection.client.rueJaiUser.isEquals(rueJaiUser))
    )
    const messageString = JSON.stringify(message)

    webSocketConnections.forEach((connection) => {
      connection.send(messageString)
    })
  }
}

export { BroadcastingRepository }
