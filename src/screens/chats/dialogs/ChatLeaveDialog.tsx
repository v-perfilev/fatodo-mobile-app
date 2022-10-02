import React, {memo} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Chat} from '../../../models/Chat';
import {ChatActions} from '../../../store/chat/chatActions';

export type ChatLeaveDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultChatLeaveDialogProps: Readonly<ChatLeaveDialogProps> = {
  chat: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const ChatLeaveDialog = ({chat, show, close, onSuccess = () => null}: ChatLeaveDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(ChatActions.leaveChatThunk(chat))
      .unwrap()
      .then(() => {
        onSuccess();
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
      title={t('chat:leaveChat.title')}
      content={t('chat:leaveChat.text')}
      loading={loading}
    />
  );
};

export default memo(ChatLeaveDialog);
