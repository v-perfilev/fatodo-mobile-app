import React, {useEffect} from 'react';
import {useAppDispatch} from '../../../store/store';
import ChatViewContainer from './ChatViewContainer';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import {UsersThunks} from '../../../store/users/usersActions';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';

type ChatViewProps = WithChatProps;

const ChatView = ({chat, loading}: ChatViewProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chat) {
      const userIds = chat.members;
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [chat]);

  return (
    <>
      <ChatViewHeader />
      <ConditionalSpinner loading={loading}>
        <ChatViewContainer />
        <ChatViewControl />
      </ConditionalSpinner>
    </>
  );
};

export default withChatContainer(ChatView);
