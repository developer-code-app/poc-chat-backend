import { Request, Response } from "express"
import { eventFromObject } from "../parsers/eventParser"
import { CreateRoomEvent } from "../models/events/roomManagementEvent"
import { ChatService } from "../service"

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

  createChatRoom = (req: Request, res: Response) => {
    const event = eventFromObject(req.body) as CreateRoomEvent

    const chatRoom = this.service.createChatRoom(event)

    res.json({
      result: {
        id: chatRoom.id,
      },
    })
  }
}

export { Controller }
