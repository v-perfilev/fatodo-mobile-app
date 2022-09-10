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
  const params = MessageUtils.parseEventMessage(message);
  const messageUsers = useAppSelector((state) => InfoSelectors.user(state, message.userId));
  const paramUsers = useAppSelector((state) => InfoSelectors.users(state, params.ids || []));

  const text = MessageUtils.buildEventMessageText(params, messageUsers, paramUsers, t);

  return (
    <Text isTruncated color="gray.400" fontSize="xs">
      {text}
    </Text>
  );
};

export default ChatListMessageEvent;
