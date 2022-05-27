import React, {useEffect} from 'react';
import {Message} from '../../../models/Message';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';
import {MessageUtils} from '../../../shared/utils/MessageUtils';
import UsersThunks from '../../../store/users/usersThunks';

type ChatListItemMessageEventProps = {
  message: Message;
};

const ChatListItemMessageEvent = ({message}: ChatListItemMessageEventProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const users = useAppSelector(UsersSelectors.users);

  const params = MessageUtils.parseEventMessage(message);
  const text = MessageUtils.buildEventMessageText(message, params, users, t);

  useEffect(() => {
    if (params.ids) {
      dispatch(UsersThunks.handleUserIds(params.ids));
    }
  }, []);

  return (
    <Text color="gray.500" fontWeight="bold" fontSize="11">
      {text}
    </Text>
  );
};

export default ChatListItemMessageEvent;
