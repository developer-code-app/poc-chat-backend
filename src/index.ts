import "reflect-metadata"

import { HttpServer } from "./http/httpServer"
import { WebSocketServer } from "./webSocket/webSocketServer"

const HTTP_PORT: string = process.env.HTTP_PORT ?? "3000"
const WSS_PORT = process.env.WS_PORT ?? "4000"

const httpServer = new HttpServer(HTTP_PORT)
const webSocketServer = new WebSocketServer(WSS_PORT)

httpServer.start()
webSocketServer.start()
