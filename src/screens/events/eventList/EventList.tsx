import React, {ReactElement, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsThunks} from '../../../store/events/eventsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useIsFocused} from '@react-navigation/native';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {FlatListType} from '../../../components/scrollable/FlatList';
import {LayoutChangeEvent} from 'react-native';
import {Event} from '../../../models/Event';
import {Box, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import EventListItem from './eventListItem/EventListItem';
import EventListSeparator from './EventListSeparator';
import Header from '../../../components/layouts/Header';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {HEADER_HEIGHT} from '../../../constants';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';

const EventList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const events = useAppSelector(EventsSelectors.events);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);
  const [loading, setLoading] = useDelayedState();
  const listRef = useRef<FlatListType>();

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

  const keyExtractor = (event: Event): string => event.id;

  const renderItem = (event: Event, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
    <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
      <EventListItem event={event} />
    </Box>
  );

  /*
  scroll down button
   */

  const scrollUp = (): void => {
    listRef.current.scrollToOffset({offset: 0});
  };

  /*
  effects
   */

  useEffect(() => {
    dispatch(EventsThunks.fetchEvents(0)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    isFocused && dispatch(EventsThunks.refreshUnreadCount());
  }, [isFocused]);

  return (
    <CollapsableRefreshableFlatList
      header={<Header hideGoBack />}
      headerHeight={HEADER_HEIGHT}
      refresh={refresh}
      loading={loading}
      ItemSeparatorComponent={EventListSeparator}
      data={events}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allLoaded ? load : undefined}
      ref={listRef}
    >
      {({scrollY}: CollapsableRefreshableChildrenProps) => <ScrollCornerButton scrollY={scrollY} scroll={scrollUp} />}
    </CollapsableRefreshableFlatList>
  );
};

export default EventList;
