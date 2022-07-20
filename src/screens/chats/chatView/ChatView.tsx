import React from 'react';
import ChatViewContainer from './ChatViewContainer';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';

type ChatViewProps = WithChatProps;

const ChatView = ({loading}: ChatViewProps) => {
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
