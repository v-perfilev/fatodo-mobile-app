import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {HEADER_HEIGHT} from '../../../constants';
import ChatListControl from './ChatListControl';
import Header from '../../../components/layouts/Header';
import {FlatListType} from '../../../components/scrollable/FlatList';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ChatListStub from './ChatListStub';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Chat} from '../../../models/Chat';
import {LayoutChangeEvent} from 'react-native';
import {Box, useTheme} from 'native-base';
import ChatListItem from './ChatListItem';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {ChatsActions} from '../../../store/chats/chatsActions';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import CornerManagement from '../../../components/controls/CornerManagement';
import {CornerButton} from '../../../models/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import ArrowUpIcon from '../../../components/icons/ArrowUpIcon';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import {useIsFocused} from '@react-navigation/native';

type ControlType = 'regular' | 'filtered';

const ChatList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const {showChatCreateDialog} = useChatDialogContext();
  const chats = useAppSelector(ChatsSelectors.chats);
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [type, setType] = useState<ControlType>('regular');
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useDelayedState();
  const [filterLoading, setFilterLoading] = useDelayedState();
  const [filterLoadCounter, setFilterLoadCounter] = useState<number>(0);
  const listRef = useRef<FlatListType>();

  const openCreateChatDialog = (): void => {
    showChatCreateDialog();
  };

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

  const header = useMemo<ReactElement>(() => <Header hideGoBack />, []);

  const previousNode = useMemo<ReactElement>(
    () => <ChatListControl setFilter={setFilter} marginTop={HEADER_HEIGHT} />,
    [],
  );

  const stub = useMemo(() => <ChatListStub />, []);

  const buttons: CornerButton[] = [
    {icon: <PlusIcon />, action: openCreateChatDialog},
    {icon: <ArrowUpIcon />, action: scrollUp, color: 'trueGray', hideOnTop: true, additionalColumn: true},
  ];
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />,
    [],
  );

  return (
    <CollapsableRefreshableFlatList
      header={header}
      headerHeight={HEADER_HEIGHT}
      refresh={type === 'regular' ? refresh : undefined}
      previousNode={previousNode}
      loading={loading || filterLoading}
      contentContainerStyle={ListUtils.containerStyle()}
      ListEmptyComponent={stub}
      data={type === 'regular' ? chats : filteredChats}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={type === 'regular' ? load : loadFiltered}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );
};

export default memo(ChatList);
