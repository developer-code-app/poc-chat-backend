import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

import { RueJaiUserType } from "../models/rueJaiUserType"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { ChatRoomEntity } from "./chatRoomEntity"
import { RueJaiUserRole } from "../models/rueJaiUserRole"

@Entity()
class RueJaiUserEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id!: number

  @Column()
  @IsString()
  rueJaiUserId!: string

  @Column()
  @IsEnum(RueJaiUserType)
  rueJaiUserType!: RueJaiUserType

  @Column()
  @IsEnum(RueJaiUserRole)
  rueJaiUserRole!: RueJaiUserRole

  @Column()
  @IsString()
  name!: string

  @Column()
  @IsString()
  thumbnailUrl!: string

  @ManyToMany(() => ChatRoomEntity)
  @JoinTable()
  chatRooms!: ChatRoomEntity[]
}

export { RueJaiUserEntity }
