enum EventType {
  CREATE_TEXT_MESSAGE = "CREATE_TEXT_MESSAGE",
  CREATE_TEXT_REPLY_MESSAGE = "CREATE_TEXT_REPLY_MESSAGE",
  CREATE_PHOTO_MESSAGE = "CREATE_PHOTO_MESSAGE",
  CREATE_VIDEO_MESSAGE = "CREATE_VIDEO_MESSAGE",
  CREATE_FILE_MESSAGE = "CREATE_FILE_MESSAGE",
  EDIT_TEXT_MESSAGE = "EDIT_TEXT_MESSAGE",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  READ_MESSAGE = "READ_MESSAGE",
  CREATE_ROOM = "CREATE_ROOM",
  UPDATE_ROOM = "UPDATE_ROOM",
  INVITE_MEMBER = "INVITE_MEMBER",
  UPDATE_MEMBER_ROLE = "UPDATE_MEMBER_ROLE",
  UNINVITE_MEMBER = "UNINVITE_MEMBER",
}

const eventTypeFromString = (str: string): EventType => {
  if (!str) {
    throw new Error(`Invalid event type: ${str}`)
  }

  switch (str.toUpperCase()) {
    case "CREATE_TEXT_MESSAGE":
      return EventType.CREATE_TEXT_MESSAGE
    case "CREATE_TEXT_REPLY_MESSAGE":
      return EventType.CREATE_TEXT_REPLY_MESSAGE
    case "CREATE_PHOTO_MESSAGE":
      return EventType.CREATE_PHOTO_MESSAGE
    case "CREATE_VIDEO_MESSAGE":
      return EventType.CREATE_VIDEO_MESSAGE
    case "CREATE_FILE_MESSAGE":
      return EventType.CREATE_FILE_MESSAGE
    case "CREATE_HOME_CARE_MESSAGE":
    case "EDIT_TEXT_MESSAGE":
      return EventType.EDIT_TEXT_MESSAGE
    case "DELETE_MESSAGE":
      return EventType.DELETE_MESSAGE
    case "READ_MESSAGE":
      return EventType.READ_MESSAGE
    case "CREATE_ROOM":
      return EventType.CREATE_ROOM
    case "UPDATE_ROOM":
      return EventType.UPDATE_ROOM
    case "INVITE_MEMBER":
      return EventType.INVITE_MEMBER
    case "UPDATE_MEMBER_ROLE":
      return EventType.UPDATE_MEMBER_ROLE
    case "UNINVITE_MEMBER":
      return EventType.UNINVITE_MEMBER
    default:
      throw new Error("Invalid event type")
  }
}

export { EventType, eventTypeFromString }
