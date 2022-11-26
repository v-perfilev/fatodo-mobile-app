import {Chat} from '../../models/Chat';

export type ChatsState = {
  chats: Chat[];
  filteredChats: Chat[];
  unreadCount: number;
  unreadMap: [string, string[]][];
  allLoaded: boolean;
  chatsInitialized: boolean;
};
