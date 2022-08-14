import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../../components/layouts/Header';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {EventsThunks} from '../../../store/events/eventsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useIsFocused} from '@react-navigation/native';
import EventsSelectors from '../../../store/events/eventsSelectors';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {LayoutChangeEvent} from 'react-native';
import {Event} from '../../../models/Event';
import {Box, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import EventListItem from './eventListItem/EventListItem';
import EventListSeparator from './EventListSeparator';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import CollapsableHeaderContainer, {
  CollapsableHeaderChildrenProps,
} from '../../../components/layouts/CollapsableHeaderContainer';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import {HEADER_HEIGHT} from '../../../constants';

const EventList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const events = useAppSelector(EventsSelectors.events);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);
  const [loading, setLoading] = useDelayedState();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
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

  const scrollUp = useCallback((): void => {
    setHideScroll(true);
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  /*
  Effects
   */

  useEffect(() => {
    dispatch(EventsThunks.fetchEvents(0)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    isFocused && !loading && dispatch(EventsThunks.refreshUnreadCount());
  }, [events, isFocused, loading]);

  return (
    <CollapsableHeaderContainer header={<Header hideGoBack />}>
      {({handleEventScroll, handleEventSnap, flatListRef}: CollapsableHeaderChildrenProps) => (
        <ConditionalSpinner loading={loading} paddingTop={HEADER_HEIGHT}>
          <FlatList
            contentContainerStyle={ListUtils.containerStyle(HEADER_HEIGHT)}
            ItemSeparatorComponent={EventListSeparator}
            data={events}
            render={renderItem}
            keyExtractor={keyExtractor}
            onScroll={handleEventScroll}
            onMomentumScrollEnd={handleEventSnap}
            onEndReached={!allLoaded ? load : undefined}
            refresh={refresh}
            setIsOnTheTop={setHideScroll}
            listRefs={[listRef, flatListRef]}
          />
          <ScrollCornerButton show={!hideScroll} scrollDown={scrollUp} />
        </ConditionalSpinner>
      )}
    </CollapsableHeaderContainer>
  );
};

export default EventList;
