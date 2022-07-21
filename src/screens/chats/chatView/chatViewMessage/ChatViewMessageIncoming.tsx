import React from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {Box, Text} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import FVStack from '../../../../components/boxes/FVStack';
import UserView from '../../../../components/views/UserView';
import ChatViewMessageReactions from './ChatViewMessageReactions';
import ChatViewMessageMenu from './ChatViewMessageMenu';

type ChatViewMessageIncomingProps = {
  message: Message;
};

const ChatViewMessageIncoming = ({message}: ChatViewMessageIncomingProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector(InfoSelectors.users);

  const user = MessageUtils.extractUserFromMessage(users, message);
  const date = DateFormatters.formatTime(new Date(message.createdAt));
  const isRead = MessageUtils.isReadMessage(message, account);

  return (
    <FHStack space="2" width="95%" mr="5%">
      <Box mt="1.5">{user && <UserView user={user} picSize="sm" />}</Box>
      <FVStack
        shrink
        smallSpace
        minW="50%"
        borderWidth="1"
        borderColor={isRead ? 'gray.300' : 'primary.500'}
        borderRadius="5"
        backgroundColor="gray.50"
        px="2"
        py="1.5"
      >
        <FHStack defaultSpace alignItems="center">
          <FHStack grow defaultSpace alignItems="center">
            <Text color="primary.500" fontWeight="bold">
              {user?.username}
            </Text>
            <Text color="gray.400" fontWeight="bold" fontSize="xs">
              {date}
            </Text>
          </FHStack>
          <ChatViewMessageMenu message={message} isOutcoming={false} />
        </FHStack>
        {!message.isDeleted && <Text color="gray.700">{message.text}</Text>}
        {message.isDeleted && (
          <Text color="gray.400" fontWeight="bold">
            {t('chat:message.deleted')}
          </Text>
        )}
      </FVStack>
      <ChatViewMessageReactions message={message} isOutcoming={false} />
    </FHStack>
  );
};

export default ChatViewMessageIncoming;
