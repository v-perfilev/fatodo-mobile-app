import React, {memo} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Chat} from '../../../models/Chat';
import {ChatActions} from '../../../store/chat/chatActions';

export type ChatDeleteDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultChatDeleteDialogProps: Readonly<ChatDeleteDialogProps> = {
  chat: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const ChatDeleteDialog = ({chat, show, close, onSuccess = () => null}: ChatDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(ChatActions.deleteChatThunk(chat))
      .unwrap()
      .then(() => {
        onSuccess?.();
        close();
      })
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
      title={t('chat:deleteChat.title')}
      content={t('chat:deleteChat.text')}
      loading={loading}
    />
  );
};

export default memo(ChatDeleteDialog);
