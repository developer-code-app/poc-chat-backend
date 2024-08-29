import 'reflect-metadata';

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { plainToInstance } from "class-transformer"
import { CreateTextMessageEvent } from "./models/events/messageEvent"
import { validateSync } from "class-validator"

const obj = {
  type: "CREATE_TEXT_MESSAGE",
  id: 1123123,
  text: "hello",
  owner: {
    rue_jai_user_id: "KornSiwat",
    rue_jai_user_type: "RUE_JAI_ADMIN",
  },
  created_at: "2024-08-29T08:16:27Z",
}

const event = plainToInstance(CreateTextMessageEvent, obj)

// console.log(typeof event.owner)
const validationErrors = validateSync(event)

if (validationErrors.length === 0) {
  console.log("No validation errors")
  // console.log(`Event: ${event.toString()}, type: ${typeof event}`)
  // console.log(`Event Owner: ${event.owner.toString()}, type: ${typeof event.owner}`)
} else {
  console.log(validationErrors)
}
