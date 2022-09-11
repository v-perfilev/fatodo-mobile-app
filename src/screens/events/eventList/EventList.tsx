import React, {ReactElement, useCallback, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsActions} from '../../../store/events/eventsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useIsFocused} from '@react-navigation/native';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {FlatListType} from '../../../components/scrollable/FlatList';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import {Event} from '../../../models/Event';
import {Box} from 'native-base';
import EventListItem from './eventListItem/EventListItem';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {HEADER_HEIGHT} from '../../../constants';
import {CornerButton} from '../../../models/CornerButton';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import Header from '../../../components/layouts/Header';
import CornerManagement from '../../../components/controls/CornerManagement';
import Separator from '../../../components/layouts/Separator';
import EventListSkeleton from '../components/skeletons/GroupListCardSkeleton';
import CentredLoader from '../../../components/surfaces/CentredLoader';

const containerStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};

const EventList = () => {
  const dispatch = useAppDispatch();
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
    await dispatch(EventsActions.refreshEventsThunk());
  }, []);

  const refreshUnread = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.refreshUnreadCountThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((event: Event): string => event.id + event.date, []);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Event>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <EventListItem event={info.item} />
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

  const buttons: CornerButton[] = [{icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true}];
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />,
    [],
  );

  return (
    <CollapsableRefreshableFlatList
      containerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<Header showAvatar hideGoBack />}
      refresh={refresh}
      loading={loading}
      loadingPlaceholder={<EventListSkeleton />}
      ListFooterComponent={events.length > 0 && !allLoaded ? <CentredLoader my="5" /> : undefined}
      ItemSeparatorComponent={Separator}
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

export default EventList;
