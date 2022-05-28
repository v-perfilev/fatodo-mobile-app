import React from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import UsersSelectors from '../../../../store/users/usersSelectors';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FVStack from '../../../../components/boxes/FVStack';
import ChatViewMessageReactions from './ChatViewMessageReactions';
import ChatViewMessageMenu from './ChatViewMessageMenu';

type ChatViewMessageOutcomingProps = {
  message: Message;
};

const ChatViewMessageOutcoming = ({message}: ChatViewMessageOutcomingProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(UsersSelectors.users);

  const user = MessageUtils.extractUserFromMessage(users, message);
  const date = DateFormatters.formatTime(new Date(message.createdAt));

  return (
    <FHStack space="2" width="90%" ml="10%">
      <ChatViewMessageReactions message={message} isOutcoming />
      <FVStack
        shrink
        smallSpace
        minW="60%"
        borderWidth="1"
        borderColor="gray.300"
        borderRadius="5"
        backgroundColor="gray.50"
        px="2"
        py="1.5"
      >
        <FHStack defaultSpace alignItems="center">
          <FHStack grow>
            <Text color="primary.500" fontWeight="bold">
              {user?.username}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="2xs">
            {date}
          </Text>
          <ChatViewMessageMenu message={message} isOutcoming />
        </FHStack>
        {!message.isDeleted && <Text>{message.text}</Text>}
        {message.isDeleted && (
          <Text color="gray.400" fontWeight="bold">
            {t('chat:message.deleted')}
          </Text>
        )}
      </FVStack>
    </FHStack>
  );
};

export default ChatViewMessageOutcoming;
