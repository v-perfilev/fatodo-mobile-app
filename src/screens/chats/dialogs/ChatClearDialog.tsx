import React, {memo} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Chat} from '../../../models/Chat';
import {ChatActions} from '../../../store/chat/chatActions';

export type ChatClearDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
};

export const defaultChatClearDialogProps: Readonly<ChatClearDialogProps> = {
  chat: null,
  show: false,
  close: () => null,
};

const ChatClearDialog = ({chat, show, close}: ChatClearDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(ChatActions.clearChatThunk(chat))
      .unwrap()
      .then(() => close())
      .finally(() => setLoading(false));
  };

  const onDisagree = (): void => {
    close();
  };

  return (
    <ConfirmationDialog
      open={show}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('chat:clearChat.title')}
      content={t('chat:clearChat.text')}
      loading={loading}
    />
  );
};

export default memo(ChatClearDialog);
