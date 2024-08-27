import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"

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
  }
}

export { ChatRoomLatestEventRecordInfo }
