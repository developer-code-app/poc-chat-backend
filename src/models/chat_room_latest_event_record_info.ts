class ChatRoomLatestEventRecordInfo {
  readonly messageRecordNumber: number;
  readonly roomManagementRecordNumber: number;

  constructor(messageRecordNumber: number, roomManagementRecordNumber: number) {
    this.messageRecordNumber = messageRecordNumber;
    this.roomManagementRecordNumber = roomManagementRecordNumber;
  }
}

export { ChatRoomLatestEventRecordInfo };