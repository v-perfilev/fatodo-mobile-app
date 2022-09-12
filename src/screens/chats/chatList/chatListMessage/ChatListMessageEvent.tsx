import React, {useCallback} from 'react';
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
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const {t} = useTranslation();
  const params = MessageUtils.parseEventMessage(message);
  const messageUsers = useAppSelector((state) => userSelector(state, message.userId));
  const paramUsers = useAppSelector((state) => usersSelector(state, params.ids || []));

  const text = MessageUtils.buildEventMessageText(params, messageUsers, paramUsers, t);

  return (
    <Text isTruncated color="gray.400" fontSize="xs">
      {text}
    </Text>
  );
};

export default ChatListMessageEvent;
