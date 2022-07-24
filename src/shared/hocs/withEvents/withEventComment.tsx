import React, {ComponentType, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {CommentInfo, CommentReactionType} from '../../../models/Comment';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';

export type WithEventCommentProps = {
  user?: User;
  group?: GroupInfo;
  item?: ItemInfo;
  comment?: CommentInfo;
  reaction?: CommentReactionType;
  date: Date;
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
    const date = event.createdAt;

    const eventUser = useMemo<User>(() => commentEvent.userId && users.get(commentEvent.userId), [users]);
    const eventGroup = useMemo<GroupInfo>(() => commentEvent.parentId && groups.get(commentEvent.parentId), [groups]);
    const eventItem = useMemo<ItemInfo>(
      () =>
        commentEvent.targetId && commentEvent.targetId !== commentEvent.parentId && items.get(commentEvent.targetId),
      [items],
    );
    const eventComment = useMemo<CommentInfo>(
      () => commentEvent.commentId && comments.get(commentEvent.commentId),
      [comments],
    );

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

export default withEventComment;
