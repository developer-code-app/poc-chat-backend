import { Request, Response } from "express"

import { eventFromObject } from "../lib/parsers/eventParser"
import { CreateRoomEvent } from "../lib/models/events/roomEvent"
import { ChatService } from "../lib/services/chatService"
import { instanceToPlain } from "class-transformer"
import { ChatRoomState } from "../lib/models/chatRoomState"

class Controller {
  private chatService = new ChatService()

  getChatRooms = async (req: Request, res: Response) => {
    const rueJaiUser = req.user

    const chatRoomStates: ChatRoomState[] = await this.chatService.getChatRoomStates(rueJaiUser)

    res.json({
      result: chatRoomStates.map((chatRoomState) => instanceToPlain(chatRoomState)),
    })
  }

  getChatRoomState = async (req: Request, res: Response) => {
    const rueJaiUser = req.user
    const chatRoomId = req.params.chatRoomId

    const chatRoomState = await this.chatService.getChatRoomState(chatRoomId, rueJaiUser)

    res.json({
      result: chatRoomState,
    })
  }

  getChatRoomMembers = async (req: Request, res: Response) => {
    const chatRoomId = req.params.chatRoomId

    const members = await this.chatService.getChatRoomMembers(chatRoomId)
    const memberObjects = members.map((member) => {
      return instanceToPlain(member)
    })

    res.json({
      result: memberObjects,
    })
  }

  getChatRoomEvents = async (req: Request, res: Response) => {
    const chatRoomId = req.params.chatRoomId
    const startAt = 0

    const events = await this.chatService.getChatRoomEvents(chatRoomId, startAt)
    const eventObjects = events.map((event) => {
      return instanceToPlain(event)
    })

    res.json({
      result: eventObjects,
    })
  }

  createChatRoom = async (req: Request, res: Response) => {
    const event = eventFromObject(req.body) as CreateRoomEvent

    const chatRoom = await this.chatService.createChatRoom(event)

    res.json({
      result: {
        id: chatRoom.id,
        name: chatRoom.name,
        thumbnailUrl: chatRoom.thumbnailUrl,
      },
    })
  }
}

export { Controller }
