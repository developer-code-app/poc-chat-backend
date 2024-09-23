import "reflect-metadata"
import dotenv from "dotenv"
import { DataSource } from "typeorm"

import { AppDataSource } from "./lib/dataSource"
import { httpServer } from "./http/httpServer"
import { webSocketServer } from "./webSocket/webSocketServer"

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
  const WSS_PORT = process.env.WSS_PORT ?? "4000"
  const HTTP_PORT: string = process.env.HTTP_PORT ?? "3000"

  webSocketServer.start(WSS_PORT)
  httpServer.start(HTTP_PORT)
}

void main()
