import React, {memo, ReactElement, useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {LayoutChangeEvent, ViewToken} from 'react-native';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatThunks} from '../../../store/chat/chatActions';
import FBox from '../../../components/boxes/FBox';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import ChatViewStub from './ChatViewStub';
import {ChatItem} from '../../../models/ChatItem';
import ChatViewItem from './ChatViewItem';
import {Box, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';

const ChatViewContainer = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const unreadTimersRef = useRef<Map<string, any>>(new Map());
  const listRef = useRef<FlatListType>();
  const chat = useAppSelector(ChatSelectors.chat);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const account = useAppSelector(AuthSelectors.account);

  /*
  loaders
   */

  const load = async (): Promise<void> => {
    await dispatch(ChatThunks.fetchMessages({chatId: chat.id, offset: chatItems.length}));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(ChatThunks.refreshMessages(chat.id));
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback((item: ChatItem): string => item.message?.id || item.date, []);
  const renderItem = useCallback(
    (item: ChatItem, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <ChatViewItem item={item} />
      </Box>
    ),
    [],
  );

  /*
  mark as read
   */

  const addTimer = useCallback((messageId: string): void => {
    const timerId = setTimeout(() => {
      dispatch(ChatThunks.markMessageAsRead({messageId, account}));
      unreadTimersRef.current.delete(messageId);
    }, TIMEOUT_BEFORE_MARK_AS_READ);
    unreadTimersRef.current.set(messageId, timerId);
  }, []);

  const deleteTimer = useCallback((messageId: string): void => {
    const timerId = unreadTimersRef.current.get(messageId);
    clearInterval(timerId);
    unreadTimersRef.current.delete(messageId);
  }, []);

  const onViewableItemsChanged = useCallback((info: {viewableItems: ViewToken[]; changed: ViewToken[]}): void => {
    const unreadIds = ChatUtils.getUnreadIds(info, account);
    const timerIds = Array.from(unreadTimersRef.current.keys());
    const idsToAdd = unreadIds.filter((id) => !timerIds.includes(id));
    const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
    idsToAdd.forEach((id) => addTimer(id));
    idsToDelete.forEach((id) => deleteTimer(id));
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
        inverted
        ListEmptyComponent={<ChatViewStub />}
        data={chatItems}
        render={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={!allLoaded ? load : undefined}
        refresh={refresh}
        onViewableItemsChanged={onViewableItemsChanged}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default memo(ChatViewContainer);
