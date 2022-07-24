import React, {memo, useCallback, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {ViewToken} from 'react-native';
import {TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import AuthSelectors from '../../../store/auth/authSelectors';
import ChatViewList from './ChatViewList';
import {ChatThunks} from '../../../store/chat/chatActions';
import FBox from '../../../components/boxes/FBox';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import {FlatListType} from '../../../components/surfaces/FlatList';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';

const ChatViewContainer = () => {
  const dispatch = useAppDispatch();
  const [hideScroll, setHideScroll] = useState<boolean>(true);
  const unreadTimersRef = useRef<Map<string, any>>(new Map());
  const listRef = useRef<FlatListType>();
  const chat = useAppSelector(ChatSelectors.chat);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const account = useAppSelector(AuthSelectors.account);

  const loadMessages = (): void => {
    dispatch(ChatThunks.fetchMessages({chatId: chat.id, offset: chatItems.length}));
  };

  const markAsRead = (messageId: string): void => {
    dispatch(ChatThunks.markMessageAsRead({messageId, account}));
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
      <ChatViewList
        loadMessages={!allLoaded ? loadMessages : undefined}
        onViewableItemsChanged={onViewableItemsChanged}
        setIsOnTheTop={setHideScroll}
        listRef={listRef}
      />
    </FBox>
  );
};

export default memo(ChatViewContainer);
