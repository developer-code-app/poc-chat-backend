import { Expose } from "class-transformer"
import { IsNumber, IsOptional, IsString, validateSync } from "class-validator"

class ChatRoom {
  @Expose({ name: "id" })
  @IsNumber()
  readonly id: number

  @Expose({ name: "name" })
  @IsString()
  readonly name: string

  @Expose({ name: "thumbnail_url" })
  @IsOptional()
  @IsString()
  readonly thumbnailUrl?: string

  constructor(id: number, name: string, thumbnailUrl?: string) {
    this.id = id
    this.name = name
    this.thumbnailUrl = thumbnailUrl

    const errors = validateSync(this)

    if (errors.length > 0) {
      throw new Error(errors.join(", "))
    }
  }
}

export { ChatRoom }
