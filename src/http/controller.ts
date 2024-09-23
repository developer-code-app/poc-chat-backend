import { Request, Response } from "express"

import { eventFromObject } from "../lib/parsers/eventParser"
import { CreateRoomEvent } from "../lib/models/events/roomEvent"
import { ChatService } from "../lib/services/chatService"
import { ChatRoom } from "../lib/models/chatRoom"
import { instanceToPlain } from "class-transformer"

class Controller {
  private chatService = new ChatService()

  getChatRooms = async (req: Request, res: Response) => {
    const rueJaiUser = req.user

    const chatRooms: ChatRoom[] = await this.chatService.getChatRooms(rueJaiUser)

    res.json({
      results: chatRooms.map((chatRoom) => {
        const { id, name, thumbnailUrl } = chatRoom

        return {
          id,
          name,
          thumbnailUrl,
        }
      }),
    })
  }

  getChatRoomLatestEventRecordInfo = async (req: Request, res: Response) => {
    const chatRoomId = parseInt(req.params.chatRoomId)

    const latestRoomAndMessageEventRecordNumber = await this.chatService.getChatRoomLatestEventRecordInfo(chatRoomId)

    res.json({
      result: {
        latestRoomAndMessageEventRecordNumber,
      },
    })
  }

  getChatRoomMembers = async (req: Request, res: Response) => {
    const chatRoomId = parseInt(req.params.chatRoomId)

    const members = await this.chatService.getChatRoomMembers(chatRoomId)
    const memberObjects = members.map((member) => {
      return instanceToPlain(member)
    })

    res.json({
      results: memberObjects,
    })
  }

  getChatRoomEvents = async (req: Request, res: Response) => {
    const chatRoomId = parseInt(req.params.chatRoomId)
    const startAt = 0

    const events = await this.chatService.getChatRoomEvents(chatRoomId, startAt)

    res.json({
      results: events,
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
