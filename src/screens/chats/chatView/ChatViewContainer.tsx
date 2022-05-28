import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  ViewToken,
  VirtualizedList,
} from 'react-native';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ChatViewStub from './ChatViewStub';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ChatViewItem from './ChatViewItem';
import ChatThunks from '../../../store/chat/chatThunks';
import {ChatItem} from '../../../models/ChatItem';
import {Theme, useTheme} from 'native-base';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE, TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import AuthSelectors from '../../../store/auth/authSelectors';
import {MessageUtils} from '../../../shared/utils/MessageUtils';
import {UserAccount} from '../../../models/User';
import ChatViewScrollButton from './ChatViewScrollButton';

const getUnreadIds = (info: {viewableItems: ViewToken[]; changed: ViewToken[]}, account: UserAccount): string[] => {
  return info.viewableItems
    .map((token) => token.item)
    .filter((item) => MessageUtils.isIncomingMessage(item.message, account))
    .filter((item) => !MessageUtils.isReadMessage(item.message, account))
    .map((item) => item.message.id);
};

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

const ChatViewContainer = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useLoadingState();
  const itemHeights = useRef<number[]>([]);
  const unreadTimers = useRef<Map<string, any>>(new Map());
  const ref = useRef<VirtualizedList<ChatItem>>();
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const chat = useAppSelector(ChatSelectors.chat);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const account = useAppSelector(AuthSelectors.account);

  const showStub = useMemo<boolean>(() => chatItems.length === 0, [chatItems]);

  const loadMessages = (): void => {
    dispatch(ChatThunks.fetchMessages({chatId: chat.id, offset: chatItems.length}))
      .unwrap()
      .finally(() => setInitialLoading(false));
  };

  const markAsRead = (messageId: string): void => {
    dispatch(ChatThunks.markAsRead(messageId));
  };

  /*
  get item layout
   */

  const setItemHeight = (index: number, event: LayoutChangeEvent): void => {
    itemHeights.current[index] = event.nativeEvent.layout.height;
  };

  const getItemLayout = (_: any, index: number): {length: number; offset: number; index: number} => {
    const length = itemHeights.current[index] || 0;
    const offset = itemHeights.current.slice(0, index).reduce((a, c) => a + c, 0);
    return {length, offset, index};
  };

  /*
  render item
   */

  const renderItem = useCallback((info: ListRenderItemInfo<ChatItem>): ReactElement => {
    const setCurrentItemHeight = (event: LayoutChangeEvent): void => setItemHeight(info.index, event);
    return <ChatViewItem item={info.item} onLayout={setCurrentItemHeight} />;
  }, []);

  /*
  list methods
   */

  const getItem = (items: ChatItem[], index: number): ChatItem => items[index];
  const getItemCount = (items: ChatItem[]): number => items?.length;
  const keyExtractor = (item: ChatItem): string => item.message?.id || item.date;

  /*
  mark as read
   */

  const addTimer = (messageId: string): void => {
    const timerId = setTimeout(() => {
      markAsRead(messageId);
      unreadTimers.current.delete(messageId);
    }, TIMEOUT_BEFORE_MARK_AS_READ);
    unreadTimers.current.set(messageId, timerId);
  };

  const deleteTimer = (messageId: string): void => {
    unreadTimers.current.delete(messageId);
  };

  const onViewableItemsChanged = (info: {viewableItems: ViewToken[]; changed: ViewToken[]}): void => {
    const unreadIds = getUnreadIds(info, account);
    const timerIds = Array.from(unreadTimers.current.keys());
    const idsToAdd = unreadIds.filter((id) => !timerIds.includes(id));
    const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
    idsToAdd.forEach((id) => addTimer(id));
    idsToDelete.forEach((id) => deleteTimer(id));
  };

  /*
  scroll down button
   */

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    setShowScrollButton(event.nativeEvent.contentOffset.y > 0);
  };

  const scrollDown = (): void => {
    ref.current.scrollToOffset({offset: 0});
  };

  useEffect(() => {
    if (chat) {
      setInitialLoading(true);
      loadMessages();
    }
  }, [chat]);

  return (
    <ConditionalSpinner loading={initialLoading}>
      {showStub ? (
        <ChatViewStub />
      ) : (
        <VirtualizedList
          data={chatItems}
          renderItem={renderItem}
          getItem={getItem}
          getItemCount={getItemCount}
          getItemLayout={getItemLayout}
          keyExtractor={keyExtractor}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={!allLoaded ? loadMessages : undefined}
          onEndReachedThreshold={5}
          onScroll={onScroll}
          inverted
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={15}
          updateCellsBatchingPeriod={50}
          contentContainerStyle={containerStyle(theme)}
          ref={ref}
        />
      )}
      {showScrollButton && <ChatViewScrollButton scrollDown={scrollDown} />}
    </ConditionalSpinner>
  );
};

export default memo(ChatViewContainer);
