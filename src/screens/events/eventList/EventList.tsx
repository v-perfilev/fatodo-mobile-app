import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef} from 'react';
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
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {HEADER_HEIGHT} from '../../../constants';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import Header from '../../../components/layouts/Header';
import CornerManagement from '../../../components/controls/CornerManagement';

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

  const load = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.fetchEventsThunk(events.length));
  }, [events.length]);

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.fetchEventsThunk(0));
  }, []);

  const refreshUnread = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.refreshUnreadCountThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((event: Event): string => event.id + event.date, []);

  const renderItem = useCallback(
    (event: Event, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <EventListItem event={event} />
      </Box>
    ),
    [],
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
    isFocused && loading && load().finally(() => setLoading(false));
  }, [isFocused]);

  useEffect(() => {
    isFocused && unreadCount > 0 && refreshUnread();
  }, [isFocused, unreadCount]);

  const header = useMemo<ReactElement>(() => <Header showAvatar hideGoBack />, []);

  const buttons: CornerButton[] = [{icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true}];
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />,
    [],
  );

  return (
    <CollapsableRefreshableFlatList
      header={header}
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
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );
};

export default memo(EventList);
