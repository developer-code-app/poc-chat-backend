/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/use-unknown-in-catch-callback-variable */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router, Request, Response, NextFunction } from "express"

import { Controller } from "./controller"

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

function createRouter() {
  const router = Router()
  const controller = new Controller()

  router.get("/chat-rooms", controller.getChatRooms)

  router.get("/chat-rooms/:chatRoomId/latest-event-record-info", controller.getChatRoomLatestEventRecordInfo)

  router.get("/chat-rooms/:chatRoomId/getChatRoomEventArchiveUrls")

  router.post("/chat-rooms", asyncHandler(controller.createChatRoom))

  return router
}

export { createRouter }
