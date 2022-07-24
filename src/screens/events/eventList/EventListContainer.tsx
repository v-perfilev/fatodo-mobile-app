import React, {useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {EventsThunks} from '../../../store/events/eventsActions';
import {FlatListType} from '../../../components/surfaces/FlatList';
import FBox from '../../../components/boxes/FBox';
import EventListFlatList from './EventListFlatList';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';

const EventListContainer = () => {
  const dispatch = useAppDispatch();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();
  const events = useAppSelector(EventsSelectors.events);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);

  const loadEvents = (): void => {
    dispatch(EventsThunks.fetchEvents(events.length));
  };

  /*
  scroll down button
   */

  const scrollDown = useCallback((): void => {
    setHideScroll(true);
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  return (
    <FBox>
      <ScrollCornerButton show={!hideScroll} scrollDown={scrollDown} />
      <EventListFlatList
        loadEvents={!allLoaded ? loadEvents : undefined}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default EventListContainer;
