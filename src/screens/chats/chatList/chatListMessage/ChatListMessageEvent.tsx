import React from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {MessageUtils} from '../../../../shared/utils/MessageUtils';

type ChatListMessageEventProps = {
  message: Message;
};

const ChatListMessageEvent = ({message}: ChatListMessageEventProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(InfoSelectors.users);

  const params = MessageUtils.parseEventMessage(message);
  const text = MessageUtils.buildEventMessageText(message, params, users, t);

  return (
    <Text isTruncated color="gray.400" fontSize="xs">
      {text}
    </Text>
  );
};

export default ChatListMessageEvent;
