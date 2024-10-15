import { IsInstance, IsOptional, IsString } from "class-validator"
import { ChatRoomMember } from "./chatRoomMember"

class ChatRoomProfile {
  @IsString()
  readonly id: string

  @IsString()
  readonly name: string

  @IsString()
  @IsOptional()
  readonly thumbnailUrl?: string

  @IsInstance(ChatRoomMember, { each: true })
  readonly members: ChatRoomMember[]

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
