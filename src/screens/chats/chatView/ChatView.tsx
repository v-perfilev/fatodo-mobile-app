import React, {ReactElement, useCallback, useRef, useState} from 'react';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';
import CollapsableHeaderContainer, {
  CollapsableHeaderChildrenProps,
} from '../../../components/layouts/CollapsableHeaderContainer';
import {HEADER_HEIGHT, TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ScrollCornerButton from '../../../components/controls/ScrollCornerButton';
import ChatViewStub from './ChatViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Box, useTheme} from 'native-base';
import ChatSelectors from '../../../store/chat/chatSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatThunks} from '../../../store/chat/chatActions';
import {ChatItem} from '../../../models/Message';
import {LayoutChangeEvent, ViewToken} from 'react-native';
import ChatViewItem from './ChatViewItem';
import {ChatUtils} from '../../../shared/utils/ChatUtils';

type ChatViewProps = WithChatProps;

const ChatView = ({loading}: ChatViewProps) => {
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
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
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
      dispatch(ChatThunks.markMessageAsRead({chatId: chat.id, messageId, account}));
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
    <CollapsableHeaderContainer header={<ChatViewHeader />}>
      {({handleEventScroll, handleEventSnap, flatListRef}: CollapsableHeaderChildrenProps) => (
        <ConditionalSpinner loading={loading} paddingTop={HEADER_HEIGHT}>
          <FlatList
            contentContainerStyle={ListUtils.containerStyle(HEADER_HEIGHT)}
            inverted
            ListEmptyComponent={<ChatViewStub />}
            data={chatItems}
            render={renderItem}
            keyExtractor={keyExtractor}
            onScroll={handleEventScroll}
            onMomentumScrollEnd={handleEventSnap}
            onEndReached={!allLoaded ? load : undefined}
            refresh={refresh}
            onViewableItemsChanged={onViewableItemsChanged}
            setIsOnTheTop={setHideScroll}
            listRefs={[listRef, flatListRef]}
          />
          <ScrollCornerButton show={!hideScroll} scrollDown={scrollDown} />
          <ChatViewControl />
        </ConditionalSpinner>
      )}
    </CollapsableHeaderContainer>
  );
};

export default withChatContainer(ChatView);
