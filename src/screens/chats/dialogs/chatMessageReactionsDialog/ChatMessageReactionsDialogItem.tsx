import React from 'react';
import UserView from '../../../../components/views/UserView';
import FHStack from '../../../../components/boxes/FHStack';
import {User} from '../../../../models/User';
import {MessageReaction} from '../../../../models/Message';
import ReactionView from '../../../../components/views/ReactionView';

type ChatMessageReactionsDialogItemProps = {
  reaction: MessageReaction;
  user: User;
};

const ChatMessageReactionsDialogItem = ({reaction, user}: ChatMessageReactionsDialogItemProps) => {
  return (
    <FHStack grow space="3" alignItems="center">
      <ReactionView reactionType={reaction.type} color="primary.500" />
      <UserView user={user} withUsername withUserPic picSize="sm" />
    </FHStack>
  );
};

export default ChatMessageReactionsDialogItem;
