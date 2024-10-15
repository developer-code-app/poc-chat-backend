import { IsInstance, IsOptional, IsString } from "class-validator"
import { ChatRoomMember } from "./chatRoomMember"
import { Expose, Type } from "class-transformer"

class ChatRoomProfile {
  @Expose({ name: "id" })
  @IsString()
  readonly id: string

  @Expose({ name: "name" })
  @IsString()
  readonly name: string

  @Expose({ name: "thumbnail_url" })
  @IsString()
  @IsOptional()
  readonly thumbnailUrl?: string

  @Expose({ name: "members" })
  @Type(() => ChatRoomMember)
  @IsInstance(ChatRoomMember, { each: true })
  readonly members: ChatRoomMember[]

  @Expose({ name: "profile_hash" })
  @IsString()
  readonly profileHash: string

  constructor(id: string, name: string, members: ChatRoomMember[], profileHash: string, thumbnailUrl?: string) {
    this.id = id
    this.name = name
    this.members = members
    this.profileHash = profileHash
    this.thumbnailUrl = thumbnailUrl
  }
}

export { ChatRoomProfile }
