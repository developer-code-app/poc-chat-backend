import { Request, Response } from "express"

import { eventFromObject } from "../lib/parsers/eventParser"
import {
  CreateRoomEvent,
  InviteMemberEvent,
  UninviteMemberEvent,
  UpdateMemberRoleEvent,
  UpdateRoomEvent,
} from "../lib/models/events/roomEvent"
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

  getChatRoomProfile = async (req: Request, res: Response) => {
    const rueJaiUser = req.user
    const chatRoomId = req.params.chatRoomId

    const chatRoomProfile = await this.chatService.getChatRoomProfile(chatRoomId, rueJaiUser)

    res.json({
      result: chatRoomProfile,
    })
  }

  getChatRoomEvents = async (req: Request, res: Response) => {
    const rueJaiUser = req.user
    const chatRoomId = req.params.chatRoomId
    const startAt = 0

    const events = await this.chatService.getChatRoomEvents(chatRoomId, startAt, rueJaiUser)
    const eventObjects = events.map((event) => {
      return instanceToPlain(event)
    })

    res.json({
      result: eventObjects,
    })
  }

  createChatRoom = async (req: Request, res: Response) => {
    const rueJaiUser = req.user
    const event = eventFromObject(req.body) as CreateRoomEvent

    const chatRoomState = await this.chatService.createChatRoom(event, rueJaiUser)

    res.json({
      result: chatRoomState,
    })
  }

  updateChatRoom = async (req: Request, res: Response) => {
    const rueJaiUser = req.user
    const chatRoomId = req.params.chatRoomId
    const event = eventFromObject(req.body) as
      | UpdateRoomEvent
      | InviteMemberEvent
      | UpdateMemberRoleEvent
      | UninviteMemberEvent

    const chatRoomState = await this.chatService.updateChatRoom(chatRoomId, event, rueJaiUser)

    res.json({
      result: chatRoomState,
    })
  }
}

export { Controller }
