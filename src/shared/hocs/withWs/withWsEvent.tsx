import * as React from 'react';
import {ComponentType, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {useWsContext} from '../../contexts/WsContext';
import {EventsThunks} from '../../../store/events/eventsActions';

enum WsEventDestinations {
  EVENT = '/user/event',
}

const withWsEvent = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const {setTopicsAndHandler, removeTopicsAndHandler} = useWsContext();
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const handler = useCallback((msg: any, topic: string): void => {
    if (topic.startsWith(WsEventDestinations.EVENT)) {
      dispatch(EventsThunks.addEvent(msg));
    }
  }, []);

  const topics = useMemo<string[]>(() => {
    return [WsEventDestinations.EVENT];
  }, [targetId]);

  useEffect(() => {
    setTopicsAndHandler('WS_EVENT', {topics, handler});
    return (): void => removeTopicsAndHandler('WS_EVENT');
  }, [targetId]);

  return <Component {...props} />;
};

export default withWsEvent;
