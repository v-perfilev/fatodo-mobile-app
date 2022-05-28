import ModalDialog from '../../../../components/modals/ModalDialog';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/store';
import SnackActions from '../../../../store/snack/snackActions';
import {User} from '../../../../models/User';
import ChatDirectMessageDialogForm from './ChatDirectMessageDialogForm';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import ChatsThunks from '../../../../store/chats/chatsThunks';

export type ChatDirectMessageDialogProps = {
  user: User;
  show: boolean;
  close: () => void;
};

export const defaultChatDirectMessageDialogProps: Readonly<ChatDirectMessageDialogProps> = {
  user: null,
  show: false,
  close: (): void => undefined,
};

const ChatDirectMessageDialog = ({user, show, close}: ChatDirectMessageDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (dto: MessageDTO, stopSubmitting: () => void): void => {
    dispatch(ChatsThunks.sendDirectMessage({userId: user.id, dto}))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('chat.messageSent', 'info'));
        close();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  const content = <ChatDirectMessageDialogForm user={user} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('contact:addContact.title')} content={content} size="xl" />;
};

export default ChatDirectMessageDialog;
