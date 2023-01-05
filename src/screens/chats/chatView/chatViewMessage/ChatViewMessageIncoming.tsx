import React, {memo, useCallback} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {Box, Text, useColorModeValue} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';
import AuthSelectors from '../../../../store/auth/authSelectors';
import FVStack from '../../../../components/boxes/FVStack';
import UserView from '../../../../components/views/UserView';
import ChatViewMessageReactions from './ChatViewMessageReactions';
import ChatViewMessageMenu from './ChatViewMessageMenu';
import DateView from '../../../../components/views/DateView';
import {UserUtils} from '../../../../shared/utils/UserUtils';

type ChatViewMessageIncomingProps = {
  message: Message;
};

const ChatViewMessageIncoming = ({message}: ChatViewMessageIncomingProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const user = useAppSelector((state) => userSelector(state, message.userId));

  const date = new Date(message.createdAt);
  const isRead = MessageUtils.isReadMessage(message, account);

  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <FHStack space="2" width="95%" mr="5%">
      <Box mt="1.5">{user && <UserView user={user} picSize="sm" />}</Box>
      <FVStack
        shrink
        space="1"
        minW="60%"
        borderWidth="1"
        borderColor={isRead ? bg : 'primary.500'}
        borderRadius="xl"
        backgroundColor={bg}
        pl="3"
        pr="2"
        py="1.5"
      >
        <FHStack space="3" alignItems="center">
          <FHStack grow space="3" alignItems="center">
            <Text color="primary.500" fontWeight="bold">
              {UserUtils.getUsername(user, t)}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="xs">
            <DateView date={date} timeFormat="FULL" />
          </Text>
          <ChatViewMessageMenu message={message} isOutcoming={false} />
        </FHStack>
        {!message.isDeleted && <Text>{message.text}</Text>}
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

export default memo(ChatViewMessageIncoming);
