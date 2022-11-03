import React, {memo} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {Text, useColorModeValue} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import ChatViewMessageReactions from './ChatViewMessageReactions';
import ChatViewMessageMenu from './ChatViewMessageMenu';
import DateView from '../../../../components/views/DateView';

type ChatViewMessageOutcomingProps = {
  message: Message;
};

const ChatViewMessageOutcoming = ({message}: ChatViewMessageOutcomingProps) => {
  const {t} = useTranslation();

  const date = new Date(message.createdAt);

  const bg = useColorModeValue('gray.100', 'gray.600');

  return (
    <FHStack space="2" width="90%" ml="10%" justifyContent="flex-end">
      <ChatViewMessageReactions message={message} isOutcoming />
      <FVStack shrink smallSpace minW="60%" borderRadius="xl" backgroundColor={bg} pl="3" pr="2" py="1.5">
        <FHStack defaultSpace alignItems="center">
          <FHStack grow defaultSpace alignItems="center">
            <Text color="primary.500" fontWeight="bold">
              {t('salutations.you')}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="2xs">
            <DateView date={date} timeFormat="FULL" />
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

export default memo(ChatViewMessageOutcoming);
