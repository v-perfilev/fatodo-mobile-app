import React, {useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import Header from '../../../components/layouts/Header';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsThunks} from '../../../store/events/eventsActions';
import EventListContainer from './EventListContainer';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useIsFocused} from '@react-navigation/native';
import EventsSelectors from '../../../store/events/eventsSelectors';

const EventList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const events = useAppSelector(EventsSelectors.events);
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    dispatch(EventsThunks.fetchEvents(0)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    isFocused && !loading && dispatch(EventsThunks.refreshUnreadCount());
  }, [events, isFocused, loading]);

  return (
    <>
      <Header hideGoBack />
      <ConditionalSpinner loading={loading}>
        <EventListContainer />
      </ConditionalSpinner>
    </>
  );
};

export default EventList;
