import "reflect-metadata"
import dotenv from "dotenv"

import { AppDataSource } from "./lib/dataSource"
import { httpServer } from "./http/httpServer"
import { webSocketServer } from "./webSocket/webSocketServer"
import { DataSource } from "typeorm"
import { ChatArchiveRepository } from "./lib/repositories/chatArchiveRepository"

async function main() {
  loadConfigs()

  await connectToDatabase()

  await startServers()
}

function loadConfigs() {
  dotenv.config()
}

async function connectToDatabase(): Promise<DataSource> {
  return AppDataSource.initialize()
}

async function startServers() {
  // const HTTP_PORT: string = process.env.HTTP_PORT ?? "3000"
  // const WSS_PORT = process.env.WSS_PORT ?? "4000"

  // httpServer.start(HTTP_PORT)
  // webSocketServer.start(WSS_PORT)

  console.log(await new ChatArchiveRepository().latestRoomAndMessageEventRecordNumber(1))
}

void main()
