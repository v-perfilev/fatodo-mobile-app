import React, {memo, ReactElement, useCallback, useMemo, useRef} from 'react';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';
import {CHATS_INPUT_HEIGHT, HEADER_HEIGHT, TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import ChatViewStub from './ChatViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Box} from 'native-base';
import ChatSelectors from '../../../store/chat/chatSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {ChatItem, Message} from '../../../models/Message';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle, ViewToken} from 'react-native';
import ChatViewItem from './ChatViewItem';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import {CornerButton} from '../../../models/CornerButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import RefreshableFlatList, {
  RefreshableFlatListChildrenProps,
} from '../../../components/scrollable/RefreshableFlatList';
import MessageListSkeleton from '../skeletons/MessageListSkeleton';
import {flowRight} from 'lodash';
import CentredLoader from '../../../components/surfaces/CentredLoader';

type ChatViewProps = WithChatProps;

const paddingTop = HEADER_HEIGHT;
const paddingBottom = CHATS_INPUT_HEIGHT;
const containerStyle: StyleProp<ViewStyle> = {paddingTop, paddingBottom};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop, paddingBottom};

const ChatView = ({chat, containerLoading}: ChatViewProps) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(ChatSelectors.messages);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const loading = useAppSelector(ChatSelectors.loading);
  const account = useAppSelector(AuthSelectors.account);
  const unreadTimersRef = useRef<Map<string, any>>(new Map());
  const listRef = useRef<FlatListType>();

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    if (chat) {
      await dispatch(ChatActions.fetchMessagesThunk({chatId: chat.id, offset: messages.length}));
    }
  }, [chat?.id, messages.length]);

  const refresh = useCallback(async (): Promise<void> => {
    if (chat) {
      await dispatch(ChatActions.refreshMessagesThunk(chat.id));
    }
  }, [chat?.id]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (item: ChatItem): string => item.date || item.message?.id || item.message?.createdAt.toString(),
    [],
  );
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ChatItem>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <ChatViewItem item={info.item} />
      </Box>
    ),
    [],
  );

  /*
  mark as read
   */

  const addTimer = useCallback(
    (message: Message): void => {
      const timerId = setTimeout(() => {
        dispatch(ChatActions.markMessageAsReadThunk(message));
        unreadTimersRef.current.delete(message.id);
      }, TIMEOUT_BEFORE_MARK_AS_READ);
      unreadTimersRef.current.set(message.id, timerId);
    },
    [chat?.id, account, unreadTimersRef.current],
  );

  const deleteTimer = useCallback(
    (messageId: string): void => {
      const timerId = unreadTimersRef.current.get(messageId);
      clearInterval(timerId);
      unreadTimersRef.current.delete(messageId);
    },
    [unreadTimersRef.current],
  );

  const onViewableItemsChanged = useCallback(
    (info: {viewableItems: ViewToken[]; changed: ViewToken[]}): void => {
      const unreadMessages = ChatUtils.getUnreadMessages(info, account);
      const unreadIds = unreadMessages.map((m) => m.id);
      const timerIds = Array.from(unreadTimersRef.current.keys());
      const messagesToAdd = unreadMessages.filter((m) => !timerIds.includes(m.id));
      const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
      messagesToAdd.forEach((m) => addTimer(m));
      idsToDelete.forEach((id) => deleteTimer(id));
    },
    [account, unreadTimersRef.current, addTimer, deleteTimer],
  );

  /*
  scroll down button
   */

  const scrollDown = (): void => listRef.current.scrollToOffset({offset: 0});

  const buttons = useMemo<CornerButton[]>(
    () => [{icon: <ArrowDownIcon />, action: scrollDown, color: 'trueGray', hideOnTop: true}],
    [],
  );
  const cornerManagement = useCallback(
    ({scrollY}: RefreshableFlatListChildrenProps) => (
      <CornerManagement buttons={buttons} scrollY={scrollY} bottomPadding={CHATS_INPUT_HEIGHT} />
    ),
    [],
  );

  return (
    <RefreshableFlatList
      contentContainerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<ChatViewHeader />}
      nextNode={<ChatViewControl />}
      refresh={refresh}
      loading={containerLoading}
      loadingPlaceholder={<MessageListSkeleton />}
      ListFooterComponent={chatItems.length > 0 && !allLoaded ? <CentredLoader my="5" /> : undefined}
      inverted
      ListEmptyComponent={<ChatViewStub />}
      data={chatItems}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allLoaded && !loading ? load : undefined}
      onViewableItemsChanged={onViewableItemsChanged}
      ref={listRef}
    >
      {cornerManagement}
    </RefreshableFlatList>
  );
};

export default flowRight([memo, withChatContainer])(ChatView);
