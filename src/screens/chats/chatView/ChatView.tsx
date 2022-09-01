import React, {memo, ReactElement, useCallback, useMemo, useRef} from 'react';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';
import {HEADER_HEIGHT, TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ChatViewStub from './ChatViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Box, useTheme} from 'native-base';
import ChatSelectors from '../../../store/chat/chatSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {ChatItem} from '../../../models/Message';
import {LayoutChangeEvent, ViewToken} from 'react-native';
import ChatViewItem from './ChatViewItem';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {CornerButton} from '../../../models/CornerButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';
import {flowRight} from 'lodash';

type ChatViewProps = WithChatProps;

const ChatView = ({loading}: ChatViewProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const unreadTimersRef = useRef<Map<string, any>>(new Map());
  const listRef = useRef<FlatListType>();
  const chat = useAppSelector(ChatSelectors.chat);
  const chatItems = useAppSelector(ChatSelectors.chatItems);
  const allLoaded = useAppSelector(ChatSelectors.allLoaded);
  const account = useAppSelector(AuthSelectors.account);

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(ChatActions.fetchMessagesThunk({chatId: chat.id, offset: chatItems.length}));
  }, [chat.id, chatItems.length]);

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ChatActions.refreshMessagesThunk(chat.id));
  }, [chat.id]);

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

  const addTimer = useCallback(
    (messageId: string): void => {
      const timerId = setTimeout(() => {
        dispatch(ChatActions.markMessageAsReadThunk({chatId: chat.id, messageId, account}));
        unreadTimersRef.current.delete(messageId);
      }, TIMEOUT_BEFORE_MARK_AS_READ);
      unreadTimersRef.current.set(messageId, timerId);
    },
    [chat.id, account, unreadTimersRef.current],
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
      const unreadIds = ChatUtils.getUnreadIds(info, account);
      const timerIds = Array.from(unreadTimersRef.current.keys());
      const idsToAdd = unreadIds.filter((id) => !timerIds.includes(id));
      const idsToDelete = timerIds.filter((id) => !unreadIds.includes(id));
      idsToAdd.forEach((id) => addTimer(id));
      idsToDelete.forEach((id) => deleteTimer(id));
    },
    [account, unreadTimersRef.current, addTimer, deleteTimer],
  );

  /*
  scroll down button
   */

  const scrollDown = (): void => listRef.current.scrollToOffset({offset: 0});

  const header = useMemo<ReactElement>(() => <ChatViewHeader />, []);

  const chatViewControl = useMemo<ReactElement>(() => <ChatViewControl />, []);

  const stub = useMemo(() => <ChatViewStub />, []);

  const buttons: CornerButton[] = [{icon: <ArrowDownIcon />, action: scrollDown, color: 'trueGray', hideOnTop: true}];
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />,
    [],
  );

  return (
    <CollapsableRefreshableFlatList
      header={header}
      headerHeight={HEADER_HEIGHT}
      nextNode={chatViewControl}
      refresh={refresh}
      loading={loading}
      inverted
      ListEmptyComponent={stub}
      data={chatItems}
      render={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={!allLoaded ? load : undefined}
      onViewableItemsChanged={onViewableItemsChanged}
      ref={listRef}
    >
      {cornerManagement}
    </CollapsableRefreshableFlatList>
  );
};

export default flowRight([memo, withChatContainer])(ChatView);
