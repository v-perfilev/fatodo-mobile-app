import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import ChatMessageStatusesDialogItem from './ChatMessageStatusesDialogItem';
import {Message, MessageStatus} from '../../../../models/Message';

type ReadStatusWithUser = {
  status: MessageStatus;
  user?: User;
};

export type ChatMessageStatusesDialogProps = {
  message: Message;
  users: User[];
  show: boolean;
  close: () => void;
};

export const defaultChatMessageStatusesDialogProps: Readonly<ChatMessageStatusesDialogProps> = {
  message: null,
  users: [],
  show: false,
  close: (): void => undefined,
};

const ChatMessageStatusesDialog = ({message, users, show, close}: ChatMessageStatusesDialogProps) => {
  const {t} = useTranslation();
  const [statuses, setStatuses] = useState<ReadStatusWithUser[]>([]);
  const [statusesToShow, setStatusesToShow] = useState<ReadStatusWithUser[]>([]);

  const updateStatusesToShow = (filter?: string): void => {
    const updatedList = statuses.filter((reaction) => reaction.user?.username?.includes(filter));
    setStatusesToShow(updatedList);
  };

  const filterStatusesToShow = (text: string): void => {
    updateStatusesToShow(text);
  };

  const combineUsersWithStatuses = (): void => {
    const userFilter =
      (userId: string) =>
      (user: User): boolean =>
        user.id === userId;
    const updatedList = message.statuses
      .filter((status) => status.type === 'READ')
      .map((status) => ({
        status,
        user: users.find(userFilter(status.userId)),
      }));
    setStatuses(updatedList);
    setStatusesToShow(updatedList);
  };

  useEffect(() => {
    if (message && users) {
      combineUsersWithStatuses();
    }
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

export default ChatMessageStatusesDialog;
