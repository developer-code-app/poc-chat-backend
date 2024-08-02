import { ChatRoomMember } from "./chat_room_member";
import { MiniApp } from "./mini_app";

class Message {
  readonly id: number;
  readonly owner: ChatRoomMember;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;
  readonly addedByEventRecordNumber?: number;
  readonly updatedByEventRecordNumber?: number;

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    this.id = id;
    this.owner = owner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.addedByEventRecordNumber = addedByEventRecordNumber;
    this.updatedByEventRecordNumber = updatedByEventRecordNumber;
  }
}

class TextMessage extends Message {
  readonly text: string;

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    text: string,
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    super(
      id,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
      addedByEventRecordNumber,
      updatedByEventRecordNumber
    );

    this.text = text;
  }
}

class TextReplyMessage extends Message {
  readonly repliedMessage: Message;
  readonly text: string;

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    repliedMessage: Message,
    text: string,
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    super(
      id,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
      addedByEventRecordNumber,
      updatedByEventRecordNumber
    );

    this.repliedMessage = repliedMessage;
    this.text = text;
  }
}

class PhotoMessage extends Message {
  readonly urls: string[];

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    urls: string[],
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    super(
      id,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
      addedByEventRecordNumber,
      updatedByEventRecordNumber
    );

    this.urls = urls;
  }
}

class VideoMessage extends Message {
  readonly url: string;

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    url: string,
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    super(
      id,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
      addedByEventRecordNumber,
      updatedByEventRecordNumber
    );

    this.url = url;
  }
}

class FileMessage extends Message {
  readonly url: string;

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    url: string,
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    super(
      id,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
      addedByEventRecordNumber,
      updatedByEventRecordNumber
    );

    this.url = url;
  }
}

class MiniAppMessage extends Message {
  readonly miniApp: MiniApp;

  constructor(
    id: number,
    owner: ChatRoomMember,
    createdAt: Date,
    updatedAt: Date,
    miniApp: MiniApp,
    deletedAt?: Date,
    addedByEventRecordNumber?: number,
    updatedByEventRecordNumber?: number
  ) {
    super(
      id,
      owner,
      createdAt,
      updatedAt,
      deletedAt,
      addedByEventRecordNumber,
      updatedByEventRecordNumber
    );

    this.miniApp = miniApp;
  }
}

export {
  Message,
  TextMessage,
  TextReplyMessage,
  PhotoMessage,
  VideoMessage,
  FileMessage,
  MiniAppMessage,
};
