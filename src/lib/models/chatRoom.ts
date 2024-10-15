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

  @Expose({ name: "profile_hash" })
  @IsString()
  readonly profileHash: string

  constructor(id: string, name: string, profileHash: string, thumbnailUrl?: string) {
    this.id = id
    this.name = name
    this.thumbnailUrl = thumbnailUrl
    this.profileHash = profileHash
  }
}

export { ChatRoom }
