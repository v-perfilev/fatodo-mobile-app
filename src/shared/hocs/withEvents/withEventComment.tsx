import React, {ComponentType, memo, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {CommentInfo, CommentReactionType} from '../../../models/Comment';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';
import {flowRight} from 'lodash';

export type WithEventCommentProps = {
  user?: User;
  group?: GroupInfo;
  item?: ItemInfo;
  comment?: CommentInfo;
  reaction?: CommentReactionType;
  date: number;
};

type ContainerProps = {
  event: Event;
};

const withEventComment =
  (Component: ComponentType<WithEventCommentProps>) =>
  ({event}: ContainerProps) => {
    const users = useAppSelector(InfoSelectors.users);
    const groups = useAppSelector(InfoSelectors.groups);
    const items = useAppSelector(InfoSelectors.items);
    const comments = useAppSelector(InfoSelectors.comments);
    const commentEvent = event.commentEvent;
    const reaction = commentEvent.reaction;
    const date = event.date;

    const eventUser = useMemo<User>(() => users.get(commentEvent?.userId), [users]);
    const eventGroup = useMemo<GroupInfo>(() => groups.get(commentEvent?.parentId), [groups]);
    const eventItem = useMemo<ItemInfo>(() => items.get(commentEvent?.targetId), [items]);
    const eventComment = useMemo<CommentInfo>(() => comments.get(commentEvent?.commentId), [comments]);

    return (
      <Component
        user={eventUser}
        group={eventGroup}
        item={eventItem}
        comment={eventComment}
        reaction={reaction}
        date={date}
      />
    );
  };

export default flowRight(withEventComment, memo);
