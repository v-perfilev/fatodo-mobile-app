import React, {ReactElement, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsActions} from '../../../store/events/eventsActions';
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
import CornerManagement from '../../../components/controls/CornerManagement';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';

const EventList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const events = useAppSelector(EventsSelectors.events);
  const unreadCount = useAppSelector(EventsSelectors.unreadCount);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);
  const [loading, setLoading] = useDelayedState();
  const listRef = useRef<FlatListType>();

  /*
  loaders
   */

  const load = async (): Promise<void> => {
    await dispatch(EventsActions.fetchEventsThunk(events.length));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(EventsActions.fetchEventsThunk(0));
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = (event: Event): string => event.id + event.date;

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

  console.log(events);

  /*
  effects
   */

  useEffect(() => {
    isFocused && loading && dispatch(EventsActions.fetchEventsThunk(0)).finally(() => setLoading(false));
    isFocused && unreadCount > 0 && dispatch(EventsActions.refreshUnreadCountThunk());
  }, [isFocused]);

  const buttons: CornerButton[] = [{icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true}];

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
      {({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />}
    </CollapsableRefreshableFlatList>
  );
};

export default EventList;
