import React, {ReactElement, useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {EventsThunks} from '../../../store/events/eventsActions';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import FBox from '../../../components/boxes/FBox';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import {Event} from '../../../models/Event';
import {LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {Box, useTheme} from 'native-base';
import EventListItem from './eventListItem/EventListItem';
import {ListUtils} from '../../../shared/utils/ListUtils';
import EventListSeparator from './EventListSeparator';

type EventListContainerProps = {
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const EventListContainer = ({onScroll}: EventListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();
  const events = useAppSelector(EventsSelectors.events);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);

  /*
  loaders
   */

  const load = async (): Promise<void> => {
    await dispatch(EventsThunks.fetchEvents(events.length));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(EventsThunks.fetchEvents(0));
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((event: Event): string => event.id, []);
  const renderItem = useCallback((event: Event, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
    return (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <EventListItem event={event} />
      </Box>
    );
  }, []);

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
      <FlatList
        ItemSeparatorComponent={EventListSeparator}
        data={events}
        render={renderItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
        onEndReached={!allLoaded ? load : undefined}
        refresh={refresh}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default EventListContainer;
