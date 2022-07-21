import React, {useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import Header from '../../../components/layouts/Header';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {EventsThunks} from '../../../store/events/eventsActions';
import EventListContainer from './EventListContainer';

const EventList = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    setLoading(true);
    dispatch(EventsThunks.fetchEvents(0))
      .unwrap()
      .finally(() => setLoading(false));
  }, []);

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
