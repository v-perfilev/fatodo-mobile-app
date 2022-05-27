import React from 'react';
import {Message} from '../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/surfaces/FHStack';
import {Text} from 'native-base';

type ChatListItemMessageOutcomingProps = {
  message: Message;
};

const ChatListItemMessageOutcoming = ({message}: ChatListItemMessageOutcomingProps) => {
  const {t} = useTranslation();

  return (
    <FHStack>
      <Text color="gray.500" fontWeight="bold">
        {t('salutations.you')}:
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

export default ChatListItemMessageOutcoming;
