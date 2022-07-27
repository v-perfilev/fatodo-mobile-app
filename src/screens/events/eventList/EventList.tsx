import React, {useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import Header from '../../../components/layouts/Header';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsThunks} from '../../../store/events/eventsActions';
import EventListContainer from './EventListContainer';
import EventsSelectors from '../../../store/events/eventsSelectors';

const EventList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(EventsSelectors.loading);

  useEffect(() => {
    dispatch(EventsThunks.fetchEvents(0));
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
