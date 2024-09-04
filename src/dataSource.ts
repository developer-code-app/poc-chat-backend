import "reflect-metadata"
import { DataSource } from "typeorm"

import { RecordedEventEntity } from "./entities/recordedEventEntity"
import { RueJaiUserEntity } from "./entities/rueJaiUserEntity"

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [RecordedEventEntity, RueJaiUserEntity],
  migrations: [],
  subscribers: [],
})

export { AppDataSource }
