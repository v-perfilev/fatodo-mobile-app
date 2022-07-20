import React from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import Header from '../../../components/layouts/Header';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import EventsSelectors from '../../../store/events/eventsSelectors';

const EventList = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(EventsSelectors.events);
  const eventsLoading = useAppSelector(EventsSelectors.loading);

  return (
    <>
      <Header hideGoBack />
      <ConditionalSpinner loading={true}>Test</ConditionalSpinner>
    </>
  );
};

export default EventList;
