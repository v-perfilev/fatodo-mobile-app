import React, {ComponentType} from 'react';
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
  date: number;
};

type ContainerProps = {
  event: Event;
};

const withEventComment =
  (Component: ComponentType<WithEventCommentProps>) =>
  ({event}: ContainerProps) => {
    const commentEvent = event.commentEvent;
    const reaction = commentEvent.reaction;
    const date = event.date;

    const user = useAppSelector((state) => InfoSelectors.user(state, commentEvent.userId));
    const group = useAppSelector((state) => InfoSelectors.group(state, commentEvent.parentId));
    const item = useAppSelector((state) => InfoSelectors.item(state, commentEvent.targetId));
    const comment = useAppSelector((state) => InfoSelectors.comment(state, commentEvent.commentId));

    return <Component user={user} group={group} item={item} comment={comment} reaction={reaction} date={date} />;
  };

export default withEventComment;
