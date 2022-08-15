import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react';
import {HEADER_HEIGHT} from '../../../constants';
import ChatListControl from './ChatListControl';
import CollapsableHeaderContainer, {
  CollapsableHeaderChildrenProps,
} from '../../../components/surfaces/CollapsableHeaderContainer';
import Header from '../../../components/layouts/Header';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ChatListStub from './ChatListStub';
import ChatListCorner from './ChatListCorner';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Chat} from '../../../models/Chat';
import {LayoutChangeEvent} from 'react-native';
import {Box, useTheme} from 'native-base';
import ChatListItem from './ChatListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {RefUtils} from '../../../shared/utils/RefUtils';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const chats = useAppSelector(ChatsSelectors.chats);
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useDelayedState();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const listRef = useRef<FlatListType>();
  const [loadCounter, setLoadCounter] = useState<number>(1);

  /*
  loaders
   */

  const load = async (): Promise<void> => {
    await dispatch(ChatsThunks.fetchChats(chats.length));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(ChatsThunks.refreshChats());
  };

  const loadFiltered = async (): Promise<void> => {
    await dispatch(ChatsThunks.fetchFilteredChats(filter));
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback(
    (chat: Chat, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <ChatListItem chat={chat} />
      </Box>
    ),
    [],
  );

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
    load().finally(() => setLoadCounter((prevState) => prevState - 1));
  }, []);

  useEffect(() => {
    const filterNotEmpty = filter?.trim().length > 0;
    setType(filterNotEmpty ? 'filtered' : 'regular');
    if (filterNotEmpty) {
      setLoadCounter((prevState) => prevState + 1);
      loadFiltered().finally(() => setLoadCounter((prevState) => prevState - 1));
    }
  }, [filter]);

  useEffect(() => {
    setLoading(loadCounter > 0);
  }, [loadCounter]);

  return (
    <CollapsableHeaderContainer header={<Header hideGoBack />}>
      {({handleEventScroll, handleEventSnap, collapsableRef}: CollapsableHeaderChildrenProps) => (
        <>
          <ChatListControl setFilter={setFilter} marginTop={HEADER_HEIGHT} />
          <ConditionalSpinner loading={loading}>
            <FlatList
              contentContainerStyle={ListUtils.containerStyle()}
              ListEmptyComponent={<ChatListStub />}
              data={type === 'regular' ? chats : filteredChats}
              render={renderItem}
              keyExtractor={keyExtractor}
              onScroll={handleEventScroll}
              onMomentumScrollEnd={handleEventSnap}
              onEndReached={type === 'regular' ? load : loadFiltered}
              refresh={type === 'regular' ? refresh : undefined}
              setIsOnTheTop={setHideScroll}
              ref={RefUtils.merge(listRef, collapsableRef)}
            />
          </ConditionalSpinner>
          <ChatListCorner />
          <ScrollCornerButton show={!hideScroll} scrollDown={scrollUp} />
        </>
      )}
    </CollapsableHeaderContainer>
  );
};

export default ChatList;
