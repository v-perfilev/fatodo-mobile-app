import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import {useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {Event} from '../../../models/Event';
import EventsSelectors from '../../../store/events/eventsSelectors';
import EventListItem from './eventListItem/EventListItem';

type EventListFlatListProps = {
  loadEvents: () => void;
  setIsOnTheTop: Dispatch<SetStateAction<boolean>>;
  listRef: MutableRefObject<FlatListType>;
};

const EventListFlatList = ({loadEvents, setIsOnTheTop, listRef}: EventListFlatListProps) => {
  const theme = useTheme();
  const events = useAppSelector(EventsSelectors.events);

  const keyExtractor = useCallback((event: Event): string => event.id, []);
  const renderItem = useCallback((event: Event, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
    return <EventListItem onLayout={onLayout} event={event} style={ListUtils.itemInvertedStyle(theme)} />;
  }, []);

  return (
    <FlatList
      data={events}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadEvents}
      setIsOnTheTop={setIsOnTheTop}
      listRef={listRef}
      style={ListUtils.invertedStyle}
      contentContainerStyle={ListUtils.containerInvertedStyle(theme)}
    />
  );
};

export default EventListFlatList;
