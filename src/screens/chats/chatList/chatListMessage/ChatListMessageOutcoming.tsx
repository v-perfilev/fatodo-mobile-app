import React from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import FBox from '../../../../components/boxes/FBox';

type ChatListMessageOutcomingProps = {
  message: Message;
};

const ChatListMessageOutcoming = ({message}: ChatListMessageOutcomingProps) => {
  const {t} = useTranslation();

  return (
    <FHStack space="1">
      <Text color="gray.400" fontWeight="bold" fontSize="xs">
        {t('salutations.you')}:
      </Text>
      {!message.isDeleted && (
        <FBox>
          <Text isTruncated fontSize="xs">
            {message.text}
          </Text>
        </FBox>
      )}
      {message.isDeleted && (
        <Text color="gray.400" fontWeight="bold" fontSize="xs">
          {t('chat:message.deleted')}
        </Text>
      )}
    </FHStack>
  );
};

export default ChatListMessageOutcoming;
