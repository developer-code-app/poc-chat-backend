import "reflect-metadata"
import { DataSource } from "typeorm"
import { plainToClass } from "class-transformer"

import { DatabaseConfig } from "./models/databaseConfig"
import { RoomAndMessageEventEntity } from "./entities/roomAndMessageEventEntity"
import { RueJaiUserEntity } from "./entities/rueJaiUserEntity"
import { ChatRoomEntity } from "./entities/chatRoomEntity"
import dotenv from "dotenv"
import { validateSync } from "class-validator"

function loadDatabaseConfig(): DatabaseConfig {
  dotenv.config()

  const config = plainToClass(DatabaseConfig, process.env)
  const errors = validateSync(config)

  if (errors.length > 0) {
    throw new Error(`Invalid database configuration: ${errors}`)
  }

  return config
}

const databaseConfig = loadDatabaseConfig()
const AppDataSource = new DataSource({
  type: "postgres",
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: true,
  logging: false,
  entities: [RoomAndMessageEventEntity, RueJaiUserEntity, ChatRoomEntity],
  migrations: [],
  subscribers: [],
})

export { AppDataSource }
