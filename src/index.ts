import "reflect-metadata"
import dotenv from "dotenv"

import { AppDataSource } from "./dataSource"
import { httpServer } from "./http/httpServer"
import { webSocketServer } from "./webSocket/webSocketServer"
import { DataSource } from "typeorm"

async function main() {
  loadConfigs()

  await connectToDatabase()

  startServers()
}

function loadConfigs() {
  dotenv.config()
}

async function connectToDatabase(): Promise<DataSource> {
  return AppDataSource.initialize()
}

function startServers() {
  const HTTP_PORT: string = process.env.HTTP_PORT ?? "3000"
  const WSS_PORT = process.env.WSS_PORT ?? "4000"

  httpServer.start(HTTP_PORT)
  webSocketServer.start(WSS_PORT)
}

void main()
