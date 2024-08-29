class WebSocketClient {
  credential: string

  constructor(credential: string) {
    this.credential = credential
  }

  toString(): string {
    return `WebSocketClient [${this.credential}]`
  }
}

export { WebSocketClient }
