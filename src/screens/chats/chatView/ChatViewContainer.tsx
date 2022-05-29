import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {NativeScrollEvent, NativeSyntheticEvent, ViewToken, VirtualizedList} from 'react-native';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ChatViewStub from './ChatViewStub';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ChatThunks from '../../../store/chat/chatThunks';
import {ChatItem} from '../../../models/ChatItem';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import AuthSelectors from '../../../store/auth/authSelectors';
import {MessageUtils} from '../../../shared/utils/MessageUtils';
import {UserAccount} from '../../../models/User';
import ChatViewScrollButton from './ChatViewScrollButton';
import ChatViewList from './ChatViewList';

const getUnreadIds = (info: {viewableItems: ViewToken[]; changed: ViewToken[]}, account: UserAccount): string[] => {
  return info.viewableItems
    .map((token) => token.item)
    .filter((item) => MessageUtils.isIncomingMessage(item.message, account))
    .filter((item) => !MessageUtils.isReadMessage(item.message, account))
    .map((item) => item.message.id);
};

const ChatViewContainer = () => {
  const dispatch = useAppDispatch();
  const [initialLoading, setInitialLoading] = useDelayedState(false);
  const [showScroll, setShowScroll] = useDelayedState(false, 500);
  const unreadTimersRef = useRef<Map<string, any>>(new Map());
  const listRef = useRef<VirtualizedList<ChatItem>>();
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
  mark as read
   */

  const addTimer = useCallback((messageId: string): void => {
    const timerId = setTimeout(() => {
      markAsRead(messageId);
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
    const unreadIds = getUnreadIds(info, account);
    const timerIds = Array.from(unreadTimersRef.current.keys());
    const idsToAdd = unreadIds.filter((id) => !timerIds.includes(id));
    const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
    idsToAdd.forEach((id) => addTimer(id));
    idsToDelete.forEach((id) => deleteTimer(id));
  }, []);

  /*
  scroll down button
   */

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    setShowScroll(event.nativeEvent.contentOffset.y > 0);
  }, []);

  const scrollDown = useCallback((): void => {
    listRef.current.scrollToOffset({offset: 0});
  }, [listRef.current]);

  useEffect(() => {
    if (chat) {
      setInitialLoading(true);
      loadMessages();
    }
  }, [chat]);

  return (
    <ConditionalSpinner loading={initialLoading}>
      <ChatViewScrollButton show={showScroll} scrollDown={scrollDown} />
      {showStub ? (
        <ChatViewStub />
      ) : (
        <ChatViewList
          loadMessages={!allLoaded ? loadMessages : undefined}
          onScroll={onScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          listRef={listRef}
        />
      )}
    </ConditionalSpinner>
  );
};

export default memo(ChatViewContainer);
