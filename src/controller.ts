import { Request, Response } from 'express'

class Controller {
  getChatRooms(req: Request, res: Response) {
    res.json({
      message: 'Get chat rooms'
    })
  }

  getChatRoomLatestEventRecordInfo(req: Request, res: Response) {
    res.json({
      message: 'Get chat room latest event record info'
    })
  }
}

export { Controller }
