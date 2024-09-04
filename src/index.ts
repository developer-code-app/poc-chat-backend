import "reflect-metadata"
import dotenv from "dotenv"

import { AppDataSource } from "./dataSource"
import { HttpServer } from "./http/httpServer"
import { WebSocketServer } from "./webSocket/webSocketServer"

async function main() {
  loadConfigs()
  await connectToDatabase()
  startServers()
}

function loadConfigs() {
  dotenv.config()
}

async function connectToDatabase() {
  await AppDataSource.initialize()
}

function startServers() {
  const HTTP_PORT: string = process.env.HTTP_PORT ?? "3000"
  const WSS_PORT = process.env.WSS_PORT ?? "4000"

  const httpServer = new HttpServer(HTTP_PORT)
  const webSocketServer = new WebSocketServer(WSS_PORT)

  httpServer.start()
  webSocketServer.start()
}

void main()
