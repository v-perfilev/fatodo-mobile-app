import React, {ReactElement, useCallback, useRef} from 'react';
import ChatViewControl from './ChatViewControl';
import ChatViewHeader from './ChatViewHeader';
import withChatContainer, {WithChatProps} from '../../../shared/hocs/withContainers/withChatContainer';
import {HEADER_HEIGHT, TIMEOUT_BEFORE_MARK_AS_READ} from '../../../constants';
import {FlatListType} from '../../../components/scrollable/FlatList';
import ChatViewStub from './ChatViewStub';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Box} from 'native-base';
import ChatSelectors from '../../../store/chat/chatSelectors';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ChatActions} from '../../../store/chat/chatActions';
import {ChatItem} from '../../../models/Message';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle, ViewToken} from 'react-native';
import ChatViewItem from './ChatViewItem';
import {ChatUtils} from '../../../shared/utils/ChatUtils';
import CollapsableRefreshableFlatList, {
  CollapsableRefreshableChildrenProps,
} from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {CornerButton} from '../../../models/CornerButton';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import CornerManagement from '../../../components/controls/CornerManagement';

type ChatViewProps = WithChatProps;

const containerStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT};
const loaderStyle: StyleProp<ViewStyle> = {paddingTop: HEADER_HEIGHT + 50};

const ChatView = ({loading}: ChatViewProps) => {
  const dispatch = useAppDispatch();
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

  const buttons: CornerButton[] = [{icon: <ArrowDownIcon />, action: scrollDown, color: 'trueGray', hideOnTop: true}];
  const cornerManagement = useCallback(
    ({scrollY}: CollapsableRefreshableChildrenProps) => <CornerManagement buttons={buttons} scrollY={scrollY} />,
    [],
  );

  return (
    <CollapsableRefreshableFlatList
      containerStyle={containerStyle}
      loaderStyle={loaderStyle}
      header={<ChatViewHeader />}
      nextNode={<ChatViewControl />}
      refresh={refresh}
      loading={loading}
      inverted
      ListEmptyComponent={<ChatViewStub />}
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

export default withChatContainer(ChatView);
