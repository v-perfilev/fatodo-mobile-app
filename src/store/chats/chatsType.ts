import {Chat} from '../../models/Chat';

export type ChatsState = {
  chats: Chat[];
  loading: boolean;
  moreLoading: boolean;
  allLoaded: boolean;
};
