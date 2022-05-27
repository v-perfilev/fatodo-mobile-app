import React from 'react';
import {Message} from '../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/surfaces/FHStack';
import {Text} from 'native-base';
import {useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';
import {MessageUtils} from '../../../shared/utils/MessageUtils';

type ChatListItemMessageIncomingProps = {
  message: Message;
};

const ChatListItemMessageIncoming = ({message}: ChatListItemMessageIncomingProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(UsersSelectors.users);

  const user = MessageUtils.extractUserFromMessage(users, message);

  return (
    <FHStack>
      <Text color="gray.500" fontWeight="bold">
        {user?.username}:
      </Text>
      {!message.isDeleted && <Text>{message.text}</Text>}
      {message.isDeleted && (
        <Text color="gray.500" fontWeight="bold">
          {t('chat:message.deleted')}
        </Text>
      )}
    </FHStack>
  );
};

export default ChatListItemMessageIncoming;
