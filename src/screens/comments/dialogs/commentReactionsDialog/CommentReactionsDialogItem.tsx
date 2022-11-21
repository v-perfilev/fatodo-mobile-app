import React from 'react';
import UserView from '../../../../components/views/UserView';
import FHStack from '../../../../components/boxes/FHStack';
import {User} from '../../../../models/User';
import ReactionView from '../../../../components/views/ReactionView';
import {CommentReaction} from '../../../../models/Comment';

type CommentReactionsDialogItemProps = {
  reaction: CommentReaction;
  user: User;
  close: () => void;
};

const CommentReactionsDialogItem = ({reaction, user, close}: CommentReactionsDialogItemProps) => {
  return (
    <FHStack grow space="3" alignItems="center">
      <ReactionView reactionType={reaction.type} color="primary.500" />
      <UserView user={user} withUsername withUserPic picSize="sm" onPressCallBack={close} />
    </FHStack>
  );
};

export default CommentReactionsDialogItem;
