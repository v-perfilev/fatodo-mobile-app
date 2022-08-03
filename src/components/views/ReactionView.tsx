import React, {ReactElement, useMemo} from 'react';

import FCenter from '../boxes/FCenter';
import {MessageReactionType} from '../../models/Message';
import {CommentReactionType} from '../../models/Comment';
import {IIconProps} from 'native-base';
import LikeIcon from '../icons/LikeIcon';
import DislikeIcon from '../icons/DislikeIcon';

type ReactionViewProps = IIconProps & {
  reactionType: MessageReactionType & CommentReactionType;
};

const ReactionView = ({reactionType, ...props}: ReactionViewProps) => {
  const iconElement = useMemo<ReactElement>(() => {
    switch (reactionType) {
      case 'LIKE':
        return <LikeIcon />;
      case 'DISLIKE':
        return <DislikeIcon />;
      default:
        return <LikeIcon />;
    }
  }, [reactionType]);

  const icon = useMemo<ReactElement>(() => React.cloneElement(iconElement, {...props}), [iconElement]);

  return <FCenter>{icon}</FCenter>;
};

export default ReactionView;
