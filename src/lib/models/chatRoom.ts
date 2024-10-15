import { Expose } from "class-transformer"
import { IsOptional, IsString } from "class-validator"

class ChatRoom {
  @Expose({ name: "id" })
  @IsString()
  readonly id: string

  @Expose({ name: "name" })
  @IsString()
  readonly name: string

  @Expose({ name: "thumbnail_url" })
  @IsOptional()
  @IsString()
  readonly thumbnailUrl?: string

  constructor(id: string, name: string, thumbnailUrl?: string) {
    this.id = id
    this.name = name
    this.thumbnailUrl = thumbnailUrl
  }
}

export { ChatRoom }
