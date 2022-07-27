import React from 'react';
import ChatViewContainer from './ChatViewContainer';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';

type ChatViewProps = WithChatProps;

const ChatView = ({loading: initialLoading}: ChatViewProps) => {
  const loading = useAppSelector(ChatSelectors.loading);

  return (
    <>
      <ChatViewHeader />
      <ConditionalSpinner loading={loading || initialLoading}>
        <ChatViewContainer />
        <ChatViewControl />
      </ConditionalSpinner>
    </>
  );
};

export default withChatContainer(ChatView);
