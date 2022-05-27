import React from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/surfaces/FHStack';
import {Text} from 'native-base';
import FlexBox from '../../../../components/surfaces/FlexBox';

type ChatListMessageOutcomingProps = {
  message: Message;
};

const ChatListMessageOutcoming = ({message}: ChatListMessageOutcomingProps) => {
  const {t} = useTranslation();

  return (
    <FHStack smallSpace>
      <Text color="gray.400" fontWeight="bold" fontSize="xs">
        {t('salutations.you')}:
      </Text>
      {!message.isDeleted && (
        <FlexBox>
          <Text isTruncated color="gray.500" fontSize="xs">
            {message.text}
          </Text>
        </FlexBox>
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
