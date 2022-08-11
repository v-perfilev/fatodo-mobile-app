import * as React from 'react';
import {useContext} from 'react';
import {Chat} from '../../../models/Chat';
import {User} from '../../../models/User';
import {Message} from '../../../models/Message';

interface ChatDialogState {
  showChatAddMembersDialog: (chat: Chat) => void;
  showChatCreateDialog: () => void;
  showChatMembersDialog: (chat: Chat) => void;
  showChatRenameDialog: (chat: Chat) => void;
  showChatClearDialog: (chat: Chat, onSuccess?: () => void) => void;
  showChatLeaveDialog: (chat: Chat, onSuccess?: () => void) => void;
  showChatDeleteDialog: (chat: Chat, onSuccess?: () => void) => void;
  showDirectMessageDialog: (user: User) => void;
  showMessageReactionsDialog: (message: Message) => void;
  showMessageReadStatusesDialog: (message: Message) => void;
  showMessageEditDialog: (message: Message) => void;
  showMessageDeleteDialog: (message: Message, onSuccess?: () => void) => void;
}

export const ChatDialogContext = React.createContext<ChatDialogState>(null);
export const useChatDialogContext = (): ChatDialogState => useContext(ChatDialogContext);
