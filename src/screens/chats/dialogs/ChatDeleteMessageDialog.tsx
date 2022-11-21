import React, {memo} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ChatActions} from '../../../store/chat/chatActions';
import {Message} from '../../../models/Message';

export type ChatDeleteMessageDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultChatDeleteMessageDialogProps: Readonly<ChatDeleteMessageDialogProps> = {
  message: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const ChatDeleteMessageDialog = ({message, show, close, onSuccess = () => null}: ChatDeleteMessageDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(ChatActions.deleteMessageThunk(message))
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
      title={t('chat:deleteMessage.title')}
      content={t('chat:deleteMessage.text')}
      loading={loading}
    />
  );
};

export default memo(ChatDeleteMessageDialog);
