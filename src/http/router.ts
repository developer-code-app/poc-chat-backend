import express from "express"
import { Controller } from "./controller"

function createRouter() {
  const router = express.Router()
  const controller = new Controller()

  router.get("/chat-rooms", controller.getChatRooms)

  router.post("/chat-room/:chatRoomId/latest-event-record-info", controller.getChatRoomLatestEventRecordInfo)

  return router
}

export { createRouter }