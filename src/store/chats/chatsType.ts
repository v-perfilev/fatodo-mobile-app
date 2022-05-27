import {Chat} from '../../models/Chat';

export type ChatsState = {
  totalUnreadMessageCount: number;
  unreadMessageCountMap: [string, number][];
  chats: Chat[];
  loading: boolean;
  moreLoading: boolean;
  allLoaded: boolean;
};
