import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {CHATS_FILTER_HEIGHT, HEADER_HEIGHT, REFRESH_HEIGHT, TAB_HEIGHT} from '../../../constants';
import ChatListControl from './ChatListControl';
import Header from '../../../components/layouts/Header';
import {FlatListType} from '../../../components/scrollable/FlatList';
import ChatListStub from './ChatListStub';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Chat} from '../../../models/Chat';
import {Dimensions, LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import {Box} from 'native-base';
import ChatListItem from './ChatListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {ChatsActions} from '../../../store/chats/chatsActions';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableFlatListChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import CornerManagement from '../../../components/controls/CornerManagement';
import {CornerButton} from '../../../models/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import {useIsFocused} from '@react-navigation/native';
import ChatListSkeleton from '../skeletons/ChatListSkeleton';
import CentredLoader from '../../../components/surfaces/CentredLoader';

type ControlType = 'regular' | 'filtered';

const paddingTop = HEADER_HEIGHT + CHATS_FILTER_HEIGHT;
const minHeight = Dimensions.get('window').height - HEADER_HEIGHT - CHATS_FILTER_HEIGHT - TAB_HEIGHT + REFRESH_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop, minHeight};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop};

const ChatList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {showChatCreateDialog} = useChatDialogContext();
  const chats = useAppSelector(ChatsSelectors.chats);
  const allLoaded = useAppSelector(ChatsSelectors.allLoaded);
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useDelayedState();
  const [filterLoading, setFilterLoading] = useDelayedState();
  const [filterLoadCounter, setFilterLoadCounter] = useState<number>(0);
  const listRef = useRef<FlatListType>();

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(ChatsActions.fetchChatsThunk(chats.length));
  }, [chats.length]);

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ChatsActions.refreshChatsThunk());
  }, []);

  const loadFiltered = useCallback(async (): Promise<void> => {
    await dispatch(ChatsActions.fetchFilteredChatsThunk(filter));
  }, [filter]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Chat>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <ChatListItem chat={info.item} />
      </Box>
    ),
    [],
  );

  /*
  scroll down button
   */

  const scrollUp = (): void => listRef.current.scrollToOffset({offset: 0});

  /*
  Effects
   */

  useEffect(() => {
    isFocused && loading && load().finally(() => setLoading(false));
  }, [isFocused]);

  useEffect(() => {
    const filterNotEmpty = filter?.trim().length > 0;
    setType(filterNotEmpty ? 'filtered' : 'regular');
    if (filterNotEmpty) {
      setFilterLoadCounter((prevState) => prevState + 1);
      loadFiltered().finally(() => setFilterLoadCounter((prevState) => prevState - 1));
    }
  }, [filter]);

  useEffect(() => {
    setFilterLoading(filterLoadCounter > 0);
  }, [filterLoadCounter]);

  const buttons = useMemo<CornerButton[]>(
    () => [
      {icon: <PlusIcon />, action: showChatCreateDialog},
      {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
    ],
    [showChatCreateDialog],
  );
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableFlatListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} />
    ),
    [buttons],
  );

  return (
    <CollapsableRefreshableFlatList
      contentContainerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<Header showAvatar hideGoBack />}
      refresh={type === 'regular' ? refresh : undefined}
      previousNode={<ChatListControl setFilter={setFilter} />}
      loading={loading || filterLoading}
      loadingPlaceholder={<ChatListSkeleton />}
      ListEmptyComponent={<ChatListStub />}
      ListFooterComponent={type === 'regular' && chats.length > 0 && !allLoaded ? <CentredLoader my="5" /> : undefined}
      data={type === 'regular' ? chats : filteredChats}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={type === 'regular' && !allLoaded ? load : undefined}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );
};

export default memo(ChatList);
