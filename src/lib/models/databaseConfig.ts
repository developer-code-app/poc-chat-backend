import { Expose, Type } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

class DatabaseConfig {
  @Expose({ name: "DB_HOST" })
  @IsString()
  public host: string

  @Expose({ name: "DB_PORT" })
  @Type(() => Number)
  @IsNumber()
  public port: number

  @Expose({ name: "DB_USER" })
  @IsString()
  public username: string

  @Expose({ name: "DB_PASSWORD" })
  @IsString()
  public password: string

  @Expose({ name: "DB_NAME" })
  @IsString()
  public database: string

  constructor(host: string, port: number, username: string, password: string, database: string) {
    this.host = host
    this.port = port
    this.username = username
    this.password = password
    this.database = database
  }
}

export { DatabaseConfig }
