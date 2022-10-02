import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import ChatMessageStatusesDialogItem from './ChatMessageStatusesDialogItem';
import {Message, MessageStatus} from '../../../../models/Message';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';

type ReadStatusWithUser = {
  status: MessageStatus;
  user?: User;
};

export type ChatMessageStatusesDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
};

export const defaultChatMessageStatusesDialogProps: Readonly<ChatMessageStatusesDialogProps> = {
  message: null,
  show: false,
  close: (): void => null,
};

const ChatMessageStatusesDialog = ({message, show, close}: ChatMessageStatusesDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const statusUserIds = useMemo(() => message?.statuses.map((s) => s.userId), [message]);
  const users = useAppSelector((state) => usersSelector(state, statusUserIds));
  const {t} = useTranslation();
  const [statuses, setStatuses] = useState<ReadStatusWithUser[]>([]);
  const [statusesToShow, setStatusesToShow] = useState<ReadStatusWithUser[]>([]);

  const filterStatusesToShow = (text: string): void => {
    const updatedList = statuses.filter((reaction) => reaction.user?.username?.includes(text));
    setStatusesToShow(updatedList);
  };

  const combineUsersWithStatuses = (): void => {
    const updatedList = message.statuses
      .filter((status) => status.type === 'READ')
      .map((status) => ({
        status,
        user: users.find((u) => u.id === status.userId),
      }));
    setStatuses(updatedList);
    setStatusesToShow(updatedList);
  };

  useEffect(() => {
    message && combineUsersWithStatuses();
  }, [message?.statuses, users]);

  const content = (
    <FVStack defaultSpace>
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterStatusesToShow} />
      {statusesToShow.length > 0 && (
        <FVStack defaultSpace>
          {statusesToShow.map((status) => (
            <ChatMessageStatusesDialogItem user={status.user} key={status.user.id} />
          ))}
        </FVStack>
      )}
      {statusesToShow.length === 0 && (
        <FCenter>
          <Text color="gray.400">{t('chat:readStatuses.readStatusesNotFound')}</Text>
        </FCenter>
      )}
    </FVStack>
  );

  return <ModalDialog open={show} close={close} title={t('chat:readStatuses.title')} content={content} />;
};

export default memo(ChatMessageStatusesDialog);
