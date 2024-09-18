import { Request, Response } from "express"

import { eventFromObject } from "../lib/parsers/eventParser"
import { CreateRoomEvent } from "../lib/models/events/roomEvent"
import { ChatService } from "../lib/services/chatService"
import { ChatRoom } from "../lib/models/chatRoom"

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

  getChatRoomEventArchiveUrls = async (_: Request, res: Response) => {
    await Promise.resolve()
    res.json({
      message: "Get chat room event archive urls",
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
