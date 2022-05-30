import React, {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {Chat} from '../../../models/Chat';
import ChatAddMembersDialog, {
  ChatAddMembersDialogProps,
  defaultChatAddMembersDialogProps,
} from '../../../screens/chats/dialogs/ChatAddMembersDialog';
import ChatCreateDialog, {
  ChatCreateDialogProps,
  defaultChatCreateDialogProps,
} from '../../../screens/chats/dialogs/ChatCreateDialog';
import ChatMembersDialog, {
  ChatMembersDialogProps,
  defaultChatMembersDialogProps,
} from '../../../screens/chats/dialogs/chatMembersDialog/ChatMembersDialog';
import ChatRenameDialog, {
  ChatRenameDialogProps,
  defaultChatRenameDialogProps,
} from '../../../screens/chats/dialogs/chatRenameDialog/ChatRenameDialog';
import {Message} from '../../../models/Message';
import ChatMessageReactionsDialog, {
  ChatMessageReactionsDialogProps,
  defaultChatMessageReactionsDialogProps,
} from '../../../screens/chats/dialogs/chatMessageReactionsDialog/ChatMessageReactionsDialog';
import ChatMessageStatusesDialog, {
  ChatMessageStatusesDialogProps,
  defaultChatMessageStatusesDialogProps,
} from '../../../screens/chats/dialogs/chatMessageStatusesDialog/ChatMessageStatusesDialog';
import ChatEditMessageDialog, {
  ChatEditMessageDialogProps,
  defaultChatEditMessageDialogProps,
} from '../../../screens/chats/dialogs/chatEditMessageDialog/ChatEditMessageDialog';
import ChatDirectMessageDialog, {
  ChatDirectMessageDialogProps,
  defaultChatDirectMessageDialogProps,
} from '../../../screens/chats/dialogs/chatDirectMessageDialog/ChatDirectMessageDialog';
import {ChatDialogContext} from '../../contexts/dialogContexts/ChatDialogContext';
import {User} from '../../../models/User';
import ChatClearDialog, {
  ChatClearDialogProps,
  defaultChatClearDialogProps,
} from '../../../screens/chats/dialogs/ChatClearDialog';
import ChatLeaveDialog, {
  ChatLeaveDialogProps,
  defaultChatLeaveDialogProps,
} from '../../../screens/chats/dialogs/ChatLeaveDialog';
import ChatDeleteDialog, {
  ChatDeleteDialogProps,
  defaultChatDeleteDialogProps,
} from '../../../screens/chats/dialogs/ChatDeleteDialog';

import ChatDeleteMessageDialog, {
  ChatDeleteMessageDialogProps,
  defaultChatDeleteMessageDialogProps,
} from '../../../screens/chats/dialogs/ChatDeleteMessageDialog';

enum ChatDialogs {
  ADD_MEMBERS = 'CHAT_ADD_MEMBERS_DIALOG',
  CREATE = 'CHAT_CREATE_DIALOG',
  MEMBERS = 'CHAT_MEMBERS_DIALOG',
  RENAME = 'CHAT_RENAME_DIALOG',
  CLEAR = 'CHAT_CLEAR_DIALOG',
  LEAVE = 'CHAT_LEAVE_DIALOG',
  DELETE = 'CHAT_DELETE_DIALOG',
  DIRECT_MESSAGE = 'CHAT_DIRECT_MESSAGE_DIALOG',
  MESSAGE_REACTIONS = 'CHAT_MESSAGE_REACTIONS_DIALOG',
  MESSAGE_READ_STATUSES = 'CHAT_MESSAGE_READ_STATUSES_DIALOG',
  MESSAGE_EDIT = 'CHAT_MESSAGE_EDIT_DIALOG',
  MESSAGE_DELETE = 'CHAT_MESSAGE_DELETE_DIALOG',
}

const withChatDialogs =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    const {handleDialog, setDialogProps, updateDialogProps, clearDialogProps} = useDialogContext();

    const showChatAddMembersDialog = useCallback(
      (chat: Chat): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.ADD_MEMBERS, {show: false});
        const props = {chat, show, close} as ChatAddMembersDialogProps;
        setDialogProps(ChatDialogs.ADD_MEMBERS, props);
      },
      [setDialogProps, updateDialogProps],
    );

    const showChatCreateDialog = useCallback((): void => {
      const show = true;
      const close = (): void => clearDialogProps(ChatDialogs.CREATE);
      const props = {show, close} as ChatCreateDialogProps;
      setDialogProps(ChatDialogs.CREATE, props);
    }, [setDialogProps, clearDialogProps]);

    const showChatMembersDialog = useCallback(
      (chat: Chat): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.MEMBERS, {show: false});
        const switchToAddMembers = (): void => {
          updateDialogProps(ChatDialogs.MEMBERS, {show: false});
          showChatAddMembersDialog(chat);
        };
        const props = {chat, show, close, switchToAddMembers} as ChatMembersDialogProps;
        setDialogProps(ChatDialogs.MEMBERS, props);
      },
      [setDialogProps, updateDialogProps, showChatAddMembersDialog],
    );

    const showChatRenameDialog = useCallback(
      (chat: Chat, title: string): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.RENAME, {show: false});
        const props = {chat, title, show, close} as ChatRenameDialogProps;
        setDialogProps(ChatDialogs.RENAME, props);
      },
      [setDialogProps, updateDialogProps],
    );

    const showChatClearDialog = useCallback(
      (chat: Chat, onSuccess?: () => void): void => {
        const show = true;
        const close = (): void => clearDialogProps(ChatDialogs.CLEAR);
        const props = {chat, show, close, onSuccess} as ChatClearDialogProps;
        setDialogProps(ChatDialogs.CLEAR, props);
      },
      [setDialogProps, clearDialogProps],
    );

    const showChatLeaveDialog = useCallback(
      (chat: Chat, onSuccess?: () => void): void => {
        const show = true;
        const close = (): void => clearDialogProps(ChatDialogs.LEAVE);
        const props = {chat, show, close, onSuccess} as ChatLeaveDialogProps;
        setDialogProps(ChatDialogs.LEAVE, props);
      },
      [setDialogProps, clearDialogProps],
    );

    const showChatDeleteDialog = useCallback(
      (chat: Chat, onSuccess?: () => void): void => {
        const show = true;
        const close = (): void => clearDialogProps(ChatDialogs.DELETE);
        const props = {chat, show, close, onSuccess} as ChatDeleteDialogProps;
        setDialogProps(ChatDialogs.DELETE, props);
      },
      [setDialogProps, clearDialogProps],
    );

    const showDirectMessageDialog = useCallback(
      (user: User): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.DIRECT_MESSAGE, {show: false});
        const props = {user, show, close} as ChatDirectMessageDialogProps;
        setDialogProps(ChatDialogs.DIRECT_MESSAGE, props);
      },
      [setDialogProps, updateDialogProps],
    );

    const showMessageReactionsDialog = useCallback(
      (message: Message): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.MESSAGE_REACTIONS, {show: false});
        const props = {message, show, close} as ChatMessageReactionsDialogProps;
        setDialogProps(ChatDialogs.MESSAGE_REACTIONS, props);
      },
      [setDialogProps, updateDialogProps],
    );

    const showMessageReadStatusesDialog = useCallback(
      (message: Message): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.MESSAGE_READ_STATUSES, {show: false});
        const props = {message, show, close} as ChatMessageStatusesDialogProps;
        setDialogProps(ChatDialogs.MESSAGE_READ_STATUSES, props);
      },
      [setDialogProps, updateDialogProps],
    );

    const showMessageEditDialog = useCallback(
      (message: Message): void => {
        const show = true;
        const close = (): void => updateDialogProps(ChatDialogs.MESSAGE_EDIT, {show: false});
        const props = {message, show, close} as ChatEditMessageDialogProps;
        setDialogProps(ChatDialogs.MESSAGE_EDIT, props);
      },
      [setDialogProps, updateDialogProps],
    );

    const showMessageDeleteDialog = useCallback(
      (message: Message, onSuccess?: () => void): void => {
        const show = true;
        const close = (): void => clearDialogProps(ChatDialogs.MESSAGE_DELETE);
        const props = {message, show, close, onSuccess} as ChatDeleteMessageDialogProps;
        setDialogProps(ChatDialogs.MESSAGE_DELETE, props);
      },
      [setDialogProps, clearDialogProps],
    );

    const initDialogs = (): void => {
      handleDialog(ChatDialogs.ADD_MEMBERS, ChatAddMembersDialog, defaultChatAddMembersDialogProps);
      handleDialog(ChatDialogs.CREATE, ChatCreateDialog, defaultChatCreateDialogProps);
      handleDialog(ChatDialogs.MEMBERS, ChatMembersDialog, defaultChatMembersDialogProps);
      handleDialog(ChatDialogs.RENAME, ChatRenameDialog, defaultChatRenameDialogProps);
      handleDialog(ChatDialogs.CLEAR, ChatClearDialog, defaultChatClearDialogProps);
      handleDialog(ChatDialogs.LEAVE, ChatLeaveDialog, defaultChatLeaveDialogProps);
      handleDialog(ChatDialogs.DELETE, ChatDeleteDialog, defaultChatDeleteDialogProps);
      handleDialog(ChatDialogs.DIRECT_MESSAGE, ChatDirectMessageDialog, defaultChatDirectMessageDialogProps);
      handleDialog(ChatDialogs.MESSAGE_REACTIONS, ChatMessageReactionsDialog, defaultChatMessageReactionsDialogProps);
      handleDialog(ChatDialogs.MESSAGE_READ_STATUSES, ChatMessageStatusesDialog, defaultChatMessageStatusesDialogProps);
      handleDialog(ChatDialogs.MESSAGE_EDIT, ChatEditMessageDialog, defaultChatEditMessageDialogProps);
      handleDialog(ChatDialogs.MESSAGE_DELETE, ChatDeleteMessageDialog, defaultChatDeleteMessageDialogProps);
    };

    useEffect(() => {
      initDialogs();
    }, []);

    const context = {
      showChatAddMembersDialog,
      showChatCreateDialog,
      showChatMembersDialog,
      showChatRenameDialog,
      showChatClearDialog,
      showChatLeaveDialog,
      showChatDeleteDialog,
      showDirectMessageDialog,
      showMessageReactionsDialog,
      showMessageReadStatusesDialog,
      showMessageEditDialog,
      showMessageDeleteDialog,
    };

    return (
      <ChatDialogContext.Provider value={context}>
        <Component {...props} />
      </ChatDialogContext.Provider>
    );
  };

export default withChatDialogs;
