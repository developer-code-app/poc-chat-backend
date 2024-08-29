import { Event, eventFromObject } from "@models/events/event"

class Message<T> {
  readonly type: string
  readonly chatRoomId: string
  readonly payload: T

  constructor(type: string, chatRoomId: string, payload: T) {
    this.type = type
    this.chatRoomId = chatRoomId
    this.payload = payload
  }
}

const messageFromObject = (obj: unknown): Message<Event> => {
  try {
    const { type, chatRoomId, payload } = obj as { type: string; chatRoomId: string; payload: unknown }

    switch (type) {
      case "EVENT": {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const event = eventFromObject(payload)

        return new Message(type, chatRoomId, event)
      }
      default:
        throw new Error("Invalid message type")
    }
  } catch (_) {
    throw new Error("Invalid message type")
  }
}

export { Message, messageFromObject }
