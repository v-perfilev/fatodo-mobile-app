import * as React from 'react';
import {useContext} from 'react';
import {Chat} from '../../../models/Chat';
import {User, UserAccount} from '../../../models/User';
import {Message} from '../../../models/Message';

interface ChatDialogState {
  showChatAddMembersDialog: (chat: Chat) => void;
  showChatCreateDialog: (account: UserAccount) => void;
  showChatMembersDialog: (chat: Chat, users: User[]) => void;
  showChatRenameDialog: (chat: Chat, title: string) => void;
  showMessageReactionsDialog: (message: Message, users: User[]) => void;
  showMessageReadStatusesDialog: (message: Message, users: User[]) => void;
  showMessageEditDialog: (message: Message) => void;
  showDirectMessageDialog: (user: User) => void;
}

export const ChatDialogContext = React.createContext<ChatDialogState>(null);
export const useChatDialogContext = (): ChatDialogState => useContext(ChatDialogContext);
