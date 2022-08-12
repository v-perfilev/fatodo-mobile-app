import React, {useEffect, useRef} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import Header from '../../../components/layouts/Header';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsThunks} from '../../../store/events/eventsActions';
import EventListContainer from './EventListContainer';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useIsFocused} from '@react-navigation/native';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {AnimatedUtils} from '../../../shared/utils/AnimatedUtils';

const EventList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const events = useAppSelector(EventsSelectors.events);
  const [loading, setLoading] = useDelayedState();
  let scrollOffsetY = useRef(AnimatedUtils.createHeaderAnimatedValue()).current;

  useEffect(() => {
    dispatch(EventsThunks.fetchEvents(0)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    isFocused && !loading && dispatch(EventsThunks.refreshUnreadCount());
  }, [events, isFocused, loading]);

  return (
    <>
      <Header hideGoBack animatedValue={scrollOffsetY} />
      <ConditionalSpinner loading={loading}>
        <EventListContainer onScroll={AnimatedUtils.headerEvent(scrollOffsetY)} />
      </ConditionalSpinner>
    </>
  );
};

export default EventList;
