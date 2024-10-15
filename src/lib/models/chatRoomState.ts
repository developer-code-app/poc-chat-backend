import { Expose } from "class-transformer"
import { IsString } from "class-validator"

class ChatRoomState {
  @Expose({ name: "id" })
  @IsString()
  readonly id: string

  @Expose({ name: "latest_room_and_message_event_record_number" })
  @IsString()
  readonly latestRoomAndMessageEventRecordNumber: string

  @Expose({ name: "profile_hash" })
  @IsString()
  readonly profileHash: string

  constructor(id: string, latestRoomAndMessageEventRecordNumber: string, profileHash: string) {
    this.id = id
    this.latestRoomAndMessageEventRecordNumber = latestRoomAndMessageEventRecordNumber
    this.profileHash = profileHash
  }
}

export { ChatRoomState }
