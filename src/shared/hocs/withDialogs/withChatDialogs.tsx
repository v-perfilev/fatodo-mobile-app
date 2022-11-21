import React, {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
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
import {flowRight} from 'lodash';

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

const withChatDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, updateDialogProps, clearDialogProps} = useDialogContext();

  const showChatAddMembersDialog = useCallback((chat: Chat): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.ADD_MEMBERS, {show: false});
    const props: ChatAddMembersDialogProps = {chat, show, close};
    setDialogProps(ChatDialogs.ADD_MEMBERS, props);
  }, []);

  const showChatCreateDialog = useCallback((): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.CREATE);
    const props: ChatCreateDialogProps = {show, close};
    setDialogProps(ChatDialogs.CREATE, props);
  }, []);

  const showChatMembersDialog = useCallback((chat: Chat): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.MEMBERS, {show: false});
    const switchToAddMembers = (): void => {
      updateDialogProps(ChatDialogs.MEMBERS, {show: false});
      showChatAddMembersDialog(chat);
    };
    const props: ChatMembersDialogProps = {chat, show, close, switchToAddMembers};
    setDialogProps(ChatDialogs.MEMBERS, props);
  }, []);

  const showChatRenameDialog = useCallback((chat: Chat): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.RENAME, {show: false});
    const props: ChatRenameDialogProps = {chat, show, close};
    setDialogProps(ChatDialogs.RENAME, props);
  }, []);

  const showChatClearDialog = useCallback((chat: Chat, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.CLEAR);
    const props: ChatClearDialogProps = {chat, show, close, onSuccess};
    setDialogProps(ChatDialogs.CLEAR, props);
  }, []);

  const showChatLeaveDialog = useCallback((chat: Chat, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.LEAVE);
    const props: ChatLeaveDialogProps = {chat, show, close, onSuccess};
    setDialogProps(ChatDialogs.LEAVE, props);
  }, []);

  const showChatDeleteDialog = useCallback((chat: Chat, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.DELETE);
    const props: ChatDeleteDialogProps = {chat, show, close, onSuccess};
    setDialogProps(ChatDialogs.DELETE, props);
  }, []);

  const showDirectMessageDialog = useCallback((user: User): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.DIRECT_MESSAGE, {show: false});
    const props: ChatDirectMessageDialogProps = {user, show, close};
    setDialogProps(ChatDialogs.DIRECT_MESSAGE, props);
  }, []);

  const showMessageReactionsDialog = useCallback((message: Message): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.MESSAGE_REACTIONS, {show: false});
    const props: ChatMessageReactionsDialogProps = {message, show, close};
    setDialogProps(ChatDialogs.MESSAGE_REACTIONS, props);
  }, []);

  const showMessageReadStatusesDialog = useCallback((message: Message): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.MESSAGE_READ_STATUSES, {show: false});
    const props: ChatMessageStatusesDialogProps = {message, show, close};
    setDialogProps(ChatDialogs.MESSAGE_READ_STATUSES, props);
  }, []);

  const showMessageEditDialog = useCallback((message: Message): void => {
    const show = true;
    const close = (): void => updateDialogProps(ChatDialogs.MESSAGE_EDIT, {show: false});
    const props: ChatEditMessageDialogProps = {message, show, close};
    setDialogProps(ChatDialogs.MESSAGE_EDIT, props);
  }, []);

  const showMessageDeleteDialog = useCallback((message: Message, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ChatDialogs.MESSAGE_DELETE);
    const props: ChatDeleteMessageDialogProps = {message, show, close, onSuccess};
    setDialogProps(ChatDialogs.MESSAGE_DELETE, props);
  }, []);

  useEffect(() => {
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
  }, []);

  const context = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  return (
    <ChatDialogContext.Provider value={context}>
      <Component {...props} />
    </ChatDialogContext.Provider>
  );
};

export default flowRight([memo, withChatDialogs]);
