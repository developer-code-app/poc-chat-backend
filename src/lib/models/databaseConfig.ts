import { Expose, Type } from "class-transformer"
import { IsNumber, IsString, validateSync } from "class-validator"

class DatabaseConfig {
  @Expose({ name: "DB_HOST" })
  @IsString()
  host: string

  @Expose({ name: "DB_PORT" })
  @Type(() => Number)
  @IsNumber()
  port: number

  @Expose({ name: "DB_USER" })
  @IsString()
  username: string

  @Expose({ name: "DB_PASSWORD" })
  @IsString()
  password: string

  @Expose({ name: "DB_NAME" })
  @IsString()
  database: string

  constructor(host: string, port: number, username: string, password: string, database: string) {
    this.host = host
    this.port = port
    this.username = username
    this.password = password
    this.database = database

    const errors = validateSync(this)

    if (errors.length > 0) {
      throw new Error(errors.join(", "))
    }
  }
}

export { DatabaseConfig }
