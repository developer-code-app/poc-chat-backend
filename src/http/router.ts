/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express"
import { Controller } from "./controller"

function createRouter() {
  const router = express.Router()
  const controller = new Controller()

  router.get("/chat-rooms", controller.getChatRooms)

  router.post("/chat-rooms/:chatRoomId/latest-event-record-info", controller.getChatRoomLatestEventRecordInfo)

  router.get("/chat-rooms/:chatRoomId/getChatRoomEventArchiveUrls")

  router.post("/chat-rooms", controller.createChatRoom)

  return router
}

export { createRouter }
