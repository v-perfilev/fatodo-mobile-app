import ModalDialog from '../../../../components/modals/ModalDialog';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/store';
import SnackActions from '../../../../store/snack/snackActions';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import {Message} from '../../../../models/Message';
import ChatEditMessageForm from './ChatEditMessageForm';
import ChatThunks from '../../../../store/chat/chatThunks';

export type ChatEditMessageDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
};

export const defaultChatEditEditMessageDialogProps: Readonly<ChatEditMessageDialogProps> = {
  message: null,
  show: false,
  close: (): void => undefined,
};

const ChatEditMessageDialog = ({message, show, close}: ChatEditMessageDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (dto: MessageDTO, stopSubmitting: () => void): void => {
    dispatch(ChatThunks.editMessage({messageId: message.id, dto}))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('chat.messageEdited', 'info'));
        close();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  const content = <ChatEditMessageForm message={message} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('chat:editMessage.title')} content={content} size="xl" />;
};

export default ChatEditMessageDialog;
