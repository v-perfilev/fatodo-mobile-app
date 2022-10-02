import ModalDialog from '../../../../components/modals/ModalDialog';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/store';
import ChatRenameForm from './ChatRenameForm';
import {Chat} from '../../../../models/Chat';
import {ChatActions} from '../../../../store/chat/chatActions';

export type ChatRenameDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
};

export const defaultChatRenameDialogProps: Readonly<ChatRenameDialogProps> = {
  chat: null,
  show: false,
  close: (): void => null,
};

const ChatRenameDialog = ({chat, show, close}: ChatRenameDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (title: string, stopSubmitting: () => void): void => {
    dispatch(ChatActions.renameChatThunk({chat, title}))
      .unwrap()
      .then(() => close())
      .catch(() => stopSubmitting());
  };

  const content = <ChatRenameForm chat={chat} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('chat:renameChat.title')} content={content} />;
};

export default memo(ChatRenameDialog);
