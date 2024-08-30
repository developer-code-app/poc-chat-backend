class WebSocketClient {
  credential: string

  constructor(credential: string) {
    this.credential = credential
  }

  toString(): string {
    return `WebSocketClient [${this.credential}]`
  }

  isEquals(client: WebSocketClient): boolean {
    return this.credential === client.credential
  }
}

export { WebSocketClient }
