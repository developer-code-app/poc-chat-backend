import { Expose } from "class-transformer"
import { IsNumber, IsString } from "class-validator"

class ChatRoomState {
  @Expose({ name: "id" })
  @IsString()
  readonly id: string

  @Expose({ name: "latest_room_and_message_event_record_number" })
  @IsNumber()
  readonly latestRoomAndMessageEventRecordNumber: number

  @Expose({ name: "profile_hash" })
  @IsString()
  readonly profileHash: string

  constructor(id: string, latestRoomAndMessageEventRecordNumber: number, profileHash: string) {
    this.id = id
    this.latestRoomAndMessageEventRecordNumber = latestRoomAndMessageEventRecordNumber
    this.profileHash = profileHash
  }
}

export { ChatRoomState }
