"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypeFromString = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["CREATE_TEXT_MESSAGE"] = "CREATE_TEXT_MESSAGE";
    EventType["CREATE_TEXT_REPLY_MESSAGE"] = "CREATE_TEXT_REPLY_MESSAGE";
    EventType["CREATE_PHOTO_MESSAGE"] = "CREATE_PHOTO_MESSAGE";
    EventType["CREATE_VIDEO_MESSAGE"] = "CREATE_VIDEO_MESSAGE";
    EventType["CREATE_FILE_MESSAGE"] = "CREATE_FILE_MESSAGE";
    EventType["EDIT_TEXT_MESSAGE"] = "EDIT_TEXT_MESSAGE";
    EventType["DELETE_MESSAGE"] = "DELETE_MESSAGE";
    EventType["READ_MESSAGE"] = "READ_MESSAGE";
    EventType["CREATE_ROOM"] = "CREATE_ROOM";
    EventType["EDIT_MEMBER_ROLE"] = "EDIT_MEMBER_ROLE";
    EventType["INVITE_MEMBER"] = "INVITE_MEMBER";
    EventType["REMOVE_MEMBER"] = "REMOVE_MEMBER";
})(EventType || (exports.EventType = EventType = {}));
var eventTypeFromString = function (str) {
    if (!str) {
        throw new Error("Invalid event type: ${str}");
    }
    switch (str.toUpperCase()) {
        case "CREATE_TEXT_MESSAGE":
            return EventType.CREATE_TEXT_MESSAGE;
        case "CREATE_TEXT_REPLY_MESSAGE":
            return EventType.CREATE_TEXT_REPLY_MESSAGE;
        case "CREATE_PHOTO_MESSAGE":
            return EventType.CREATE_PHOTO_MESSAGE;
        case "CREATE_VIDEO_MESSAGE":
            return EventType.CREATE_VIDEO_MESSAGE;
        case "CREATE_FILE_MESSAGE":
            return EventType.CREATE_FILE_MESSAGE;
        case "CREATE_HOME_CARE_MESSAGE":
        case "EDIT_TEXT_MESSAGE":
            return EventType.EDIT_TEXT_MESSAGE;
        case "DELETE_MESSAGE":
            return EventType.DELETE_MESSAGE;
        case "READ_MESSAGE":
            return EventType.READ_MESSAGE;
        case "CREATE_ROOM":
            return EventType.CREATE_ROOM;
        case "EDIT_MEMBER_ROLE":
            return EventType.EDIT_MEMBER_ROLE;
        case "INVITE_MEMBER":
            return EventType.INVITE_MEMBER;
        case "REMOVE_MEMBER":
            return EventType.REMOVE_MEMBER;
        default:
            throw new Error("Invalid event type");
    }
};
exports.eventTypeFromString = eventTypeFromString;
