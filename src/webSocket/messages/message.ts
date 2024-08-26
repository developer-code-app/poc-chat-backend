class Message<T> {
  readonly type: string
  readonly chatRoomId: string
  readonly payload: T

  constructor(type: string, chatRoomId: string, payload: T) {
    this.type = type
    this.chatRoomId = chatRoomId
    this.payload = payload
  }

  static fromJSON(json: unknown): Message<Event> {
    try {
      const { type, chatRoomId, payload } = json as { type: string; chatRoomId: string; payload: unknown }

      // if (type !== "EVENT") {
      throw new Error("Invalid message type")
      // }

      // return new Message<Event>(type, chatRoomId, Event)
    } catch (_) {
      throw new Error("Invalid message type")
    }
  }
}

export { Message }
