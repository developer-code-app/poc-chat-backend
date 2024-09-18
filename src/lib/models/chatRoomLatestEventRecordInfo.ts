import { Expose } from "class-transformer"
import { IsNumber, validateSync } from "class-validator"

class ChatRoomLatestEventRecordInfo {
  @Expose({ name: "message_record_number" })
  @IsNumber()
  readonly messageRecordNumber: number

  @Expose({ name: "room_management_record_number" })
  @IsNumber()
  readonly roomManagementRecordNumber: number

  constructor(messageRecordNumber: number, roomManagementRecordNumber: number) {
    this.messageRecordNumber = messageRecordNumber
    this.roomManagementRecordNumber = roomManagementRecordNumber

    const errors = validateSync(this)

    if (errors.length > 0) {
      throw new Error(errors.join(", "))
    }
  }
}

export { ChatRoomLatestEventRecordInfo }
