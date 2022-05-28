import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {
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
import {Box, FlatList, Theme, useTheme} from 'native-base';
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

const invertedStyle = {
  scaleY: -1,
} as StyleProp<ViewStyle>;

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

const ChatViewContainer = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [initialLoading, setInitialLoading] = useLoadingState();
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
  render item
   */

  const keyExtractor = useCallback((item: ChatItem): string => item.message?.id || item.date, []);
  const renderItem = useCallback((info: ListRenderItemInfo<ChatItem>): ReactElement => {
    return (
      <Box style={invertedStyle}>
        <ChatViewItem item={info.item} />
      </Box>
    );
  }, []);

  /*
  mark as read
   */

  const addTimer = useCallback((messageId: string): void => {
    const timerId = setTimeout(() => {
      markAsRead(messageId);
      unreadTimers.current.delete(messageId);
    }, TIMEOUT_BEFORE_MARK_AS_READ);
    unreadTimers.current.set(messageId, timerId);
  }, []);

  const deleteTimer = useCallback((messageId: string): void => {
    const timerId = unreadTimers.current.get(messageId);
    clearInterval(timerId);
    unreadTimers.current.delete(messageId);
  }, []);

  const onViewableItemsChanged = useCallback((info: {viewableItems: ViewToken[]; changed: ViewToken[]}): void => {
    const unreadIds = getUnreadIds(info, account);
    const timerIds = Array.from(unreadTimers.current.keys());
    const idsToAdd = unreadIds.filter((id) => !timerIds.includes(id));
    const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
    idsToAdd.forEach((id) => addTimer(id));
    idsToDelete.forEach((id) => deleteTimer(id));
  }, []);

  /*
  scroll down button
   */

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    setShowScrollButton(event.nativeEvent.contentOffset.y > 0);
  }, []);

  const scrollDown = useCallback((): void => {
    ref.current.scrollToOffset({offset: 0});
  }, [ref.current]);

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
        <FlatList
          style={invertedStyle}
          data={chatItems}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={!allLoaded ? loadMessages : undefined}
          onEndReachedThreshold={5}
          onViewableItemsChanged={onViewableItemsChanged}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          // inverted
          ref={ref}
          contentContainerStyle={containerStyle(theme)}
        />
      )}
      {showScrollButton && <ChatViewScrollButton scrollDown={scrollDown} />}
    </ConditionalSpinner>
  );
};

export default memo(ChatViewContainer);
