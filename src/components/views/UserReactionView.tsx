import React from 'react';

import FCenter from '../boxes/FCenter';
import {MessageReactionType} from '../../models/Message';
import {CommentReactionType} from '../../models/Comment';
import {User} from '../../models/User';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import UserView from './UserView';
import {Box} from 'native-base';
import ReactionView from './ReactionView';

type UserReactionViewProps = {
  user: User;
  size: ISizes;
  reactionType: MessageReactionType & CommentReactionType;
};

const UserReactionView = ({user, size, reactionType}: UserReactionViewProps) => {
  return (
    <FCenter>
      <UserView user={user} picSize={size} />
      <Box position="absolute" right="0" bottom="0">
        <ReactionView reactionType={reactionType} color="primary.500" />
      </Box>
    </FCenter>
  );
};

export default UserReactionView;
