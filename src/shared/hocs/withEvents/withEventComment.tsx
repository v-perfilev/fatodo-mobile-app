import React, {ComponentType, useCallback} from 'react';
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
    const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
    const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
    const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
    const commentSelector = useCallback(InfoSelectors.makeCommentSelector(), []);
    const commentEvent = event.commentEvent;
    const reaction = commentEvent.reaction;
    const date = event.date;

    const user = useAppSelector((state) => userSelector(state, commentEvent.userId));
    const group = useAppSelector((state) => groupSelector(state, commentEvent.parentId));
    const item = useAppSelector((state) => itemSelector(state, commentEvent.targetId));
    const comment = useAppSelector((state) => commentSelector(state, commentEvent.commentId));

    return <Component user={user} group={group} item={item} comment={comment} reaction={reaction} date={date} />;
  };

export default withEventComment;
