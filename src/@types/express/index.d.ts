import { RueJaiUser } from "../../lib/models/rueJaiUser"

declare module "express-serve-static-core" {
  interface Request {
    user: RueJaiUser
  }
}
