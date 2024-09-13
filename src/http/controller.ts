import { Request, Response } from "express"
import { ChatService } from "../lib/service"
import { eventFromObject } from "../lib/parsers/eventParser"
import { CreateRoomEvent } from "../lib/models/events/roomEvent"

class Controller {
  private service = new ChatService()

  getChatRooms = (_: Request, res: Response) => {
    res.json({
      message: "Get chat rooms",
    })
  }

  getChatRoomLatestEventRecordInfo = (_: Request, res: Response) => {
    res.json({
      message: "Get chat room latest event record info",
    })
  }

  getChatRoomEventArchiveUrls = (_: Request, res: Response) => {
    res.json({
      message: "Get chat room event archive urls",
    })
  }

  createChatRoom = async (req: Request, res: Response) => {
    const event = eventFromObject(req.body) as CreateRoomEvent

    const chatRoom = await this.service.createChatRoom(event)

    res.json({
      result: {
        id: chatRoom.id,
      },
    })
  }
}

export { Controller }
