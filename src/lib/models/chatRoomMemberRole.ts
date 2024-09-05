enum ChatRoomMemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

const chatRoomMemberRoleFromString = (role: string): ChatRoomMemberRole => {
  switch (role) {
    case "ADMIN":
      return ChatRoomMemberRole.ADMIN
    case "MEMBER":
      return ChatRoomMemberRole.MEMBER
    default:
      throw new Error("Invalid chat room member role")
  }
}

export { ChatRoomMemberRole, chatRoomMemberRoleFromString }
