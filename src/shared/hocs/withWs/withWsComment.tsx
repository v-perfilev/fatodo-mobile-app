import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {useWsContext} from '../../contexts/WsContext';
import {CommentsActions} from '../../../store/comments/commentsActions';

enum WsCommentDestinations {
  COMMENT_NEW = '/user/comment/new/',
  COMMENT_UPDATE = '/user/comment/update/',
  COMMENT_REACTION = '/user/comment/reaction/',
}

const withWsComment = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsCommentDestinations.COMMENT_NEW)) {
      dispatch(CommentsActions.addCommentWs(msg));
    } else if (topic.startsWith(WsCommentDestinations.COMMENT_UPDATE)) {
      dispatch(CommentsActions.updateCommentWs(msg));
    } else if (topic.startsWith(WsCommentDestinations.COMMENT_REACTION)) {
      dispatch(CommentsActions.updateCommentReactionsWs(msg));
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    const wsTopics = [] as string[];
    if (targetId) {
      wsTopics.push(
        WsCommentDestinations.COMMENT_NEW + targetId,
        WsCommentDestinations.COMMENT_UPDATE + targetId,
        WsCommentDestinations.COMMENT_REACTION + targetId,
      );
    }
    return wsTopics;
  }, [targetId]);

  useEffect(() => {
    setTopicsAndHandler('WS_COMMENT', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_COMMENT');
  }, [targetId]);

  return <Component {...props} />;
};

export default withWsComment;
