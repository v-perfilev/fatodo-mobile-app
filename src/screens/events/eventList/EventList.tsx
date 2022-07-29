import React, {useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import Header from '../../../components/layouts/Header';
import {useAppDispatch} from '../../../store/store';
import {EventsThunks} from '../../../store/events/eventsActions';
import EventListContainer from './EventListContainer';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

const EventList = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    dispatch(EventsThunks.fetchEvents(0)).finally(() => setLoading(false));
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
