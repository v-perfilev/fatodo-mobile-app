import React, {memo, ReactElement, useCallback, useEffect, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ListRenderItemInfo, StyleProp, ViewStyle, ViewToken, VirtualizedList} from 'react-native';
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
  const unreadTimers = useRef<Map<string, any>>(new Map());
  const ref = useRef<VirtualizedList<ChatItem>>();
  const chat = useAppSelector(ChatSelectors.chat);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const account = useAppSelector(AuthSelectors.account);

  const loadMessages = useCallback((): void => {
    dispatch(ChatThunks.fetchMessages({chatId: chat.id, offset: chatItems.length}))
      .unwrap()
      .finally(() => setInitialLoading(false));
  }, [chat?.id, chatItems.length]);

  const markAsRead = (messageId: string): void => {
    dispatch(ChatThunks.markAsRead(messageId));
  };

  const showStub = useMemo<boolean>(() => chatItems.length === 0, [chatItems]);

  useEffect(() => {
    if (chat) {
      setInitialLoading(true);
      loadMessages();
    }
  }, [chat]);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<ChatItem>): ReactElement => <ChatViewItem item={info.item} />,
    [],
  );
  const getItem = useCallback((items: ChatItem[], index: number): ChatItem => items[index], []);
  const getItemCount = useCallback((items: ChatItem[]): number => items.length, []);
  const keyExtractor = useCallback((item: ChatItem): string => item.message?.id || item.date, []);

  const addTimer = useCallback(
    (messageId: string): void => {
      const timerId = setTimeout(() => {
        markAsRead(messageId);
        unreadTimers.current.delete(messageId);
      }, TIMEOUT_BEFORE_MARK_AS_READ);
      unreadTimers.current.set(messageId, timerId);
    },
    [unreadTimers.current],
  );
  const deleteTimer = useCallback(
    (messageId: string): void => {
      unreadTimers.current.delete(messageId);
    },
    [unreadTimers.current],
  );
  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}): void => {
      const unreadIds = getUnreadIds(info, account);
      const timerIds = Array.from(unreadTimers.current.keys());
      const idsToAdd = unreadIds.filter((id) => !timerIds.includes(id));
      const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
      idsToAdd.forEach((id) => addTimer(id));
      idsToDelete.forEach((id) => deleteTimer(id));
    },
    [unreadTimers.current],
  );

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
          keyExtractor={keyExtractor}
          onViewableItemsChanged={onViewableItemsChanged}
          onEndReached={!allLoaded ? loadMessages : undefined}
          onEndReachedThreshold={5}
          inverted
          removeClippedSubviews
          contentContainerStyle={containerStyle(theme)}
          ref={ref}
        />
      )}
    </ConditionalSpinner>
  );
};

export default memo(ChatViewContainer);
