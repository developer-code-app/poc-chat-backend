import { HttpServer } from "./http/httpServer"
import { WebSocketServer } from "./webSocket/webSocketServer"

const httpServer = new HttpServer()
const webSocketServer = new WebSocketServer()

httpServer.start()
webSocketServer.start()
