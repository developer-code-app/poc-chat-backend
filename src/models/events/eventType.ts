enum EventType {
  CREATE_TEXT_MESSAGE = "CREATE_TEXT_MESSAGE",
  CREATE_TEXT_REPLY_MESSAGE = "CREATE_TEXT_REPLY_MESSAGE",
  CREATE_PHOTO_MESSAGE = "CREATE_PHOTO_MESSAGE",
  CREATE_VIDEO_MESSAGE = "CREATE_VIDEO_MESSAGE",
  CREATE_FILE_MESSAGE = "CREATE_FILE_MESSAGE",
  CREATE_HOME_CARE_MESSAGE = "CREATE_HOME_CARE_MESSAGE",
  TEXT_EDITED = "TEXT_EDITED",
  DELETE_MESSAGE = "DELETE_MESSAGE",
  READ_MESSAGE = "READ_MESSAGE",
  CREATE_ROOM = "CREATE_ROOM",
  ROLE_EDITED = "ROLE_EDITED",
  INVITE = "INVITE",
  REJECT = "REJECT",
}

const eventTypeFromString = (str: string): EventType => {
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
      return EventType.CREATE_HOME_CARE_MESSAGE
    case "TEXT_EDITED":
      return EventType.TEXT_EDITED
    case "DELETE_MESSAGE":
      return EventType.DELETE_MESSAGE
    case "READ_MESSAGE":
      return EventType.READ_MESSAGE
    case "CREATE_ROOM":
      return EventType.CREATE_ROOM
    case "ROLE_EDITED":
      return EventType.ROLE_EDITED
    case "INVITE":
      return EventType.INVITE
    case "REJECT":
      return EventType.REJECT
    default:
      throw new Error("Invalid event type")
  }
}

export { EventType, eventTypeFromString }
