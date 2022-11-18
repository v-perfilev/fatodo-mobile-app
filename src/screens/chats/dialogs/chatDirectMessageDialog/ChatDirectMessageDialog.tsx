import ModalDialog from '../../../../components/modals/ModalDialog';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/store';
import {User} from '../../../../models/User';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import ChatDirectMessageForm from './ChatDirectMessageForm';
import {ChatsActions} from '../../../../store/chats/chatsActions';

export type ChatDirectMessageDialogProps = {
  user: User;
  show: boolean;
  close: () => void;
};

export const defaultChatDirectMessageDialogProps: Readonly<ChatDirectMessageDialogProps> = {
  user: null,
  show: false,
  close: (): void => null,
};

const ChatDirectMessageDialog = ({user, show, close}: ChatDirectMessageDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (dto: MessageDTO, stopSubmitting: () => void): void => {
    dispatch(ChatsActions.sendDirectMessageThunk({userId: user.id, dto}))
      .unwrap()
      .then(() => close())
      .catch(() => stopSubmitting());
  };

  const content = user && <ChatDirectMessageForm user={user} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('chat:directMessage.title')} content={content} size="xl" />;
};

export default memo(ChatDirectMessageDialog);
