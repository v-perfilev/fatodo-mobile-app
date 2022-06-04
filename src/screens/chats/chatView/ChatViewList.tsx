import React, {MutableRefObject, ReactElement, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
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
import ChatViewItem from './ChatViewItem';
import {ChatItem} from '../../../models/ChatItem';
import {FlatList, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ChatViewStub from './ChatViewStub';

const invertedStyle = {
  scaleY: -1,
} as StyleProp<ViewStyle>;

type ChatViewListProps = {
  loadMessages: () => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onViewableItemsChanged: (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => void;
  listRef: MutableRefObject<VirtualizedList<ChatItem>>;
};

const ChatViewList = ({loadMessages, onScroll, onViewableItemsChanged, listRef}: ChatViewListProps) => {
  const theme = useTheme();
  const chatItems = useAppSelector(ChatSelectors.chatItems);

  const keyExtractor = useCallback((item: ChatItem): string => item.message?.id || item.date, []);
  const renderItem = useCallback((info: ListRenderItemInfo<ChatItem>): ReactElement => {
    return <ChatViewItem item={info.item} style={[invertedStyle, ListUtils.itemStyle(theme)]} />;
  }, []);

  // TODO optimize
  return (
    <FlatList
      ListEmptyComponent={<ChatViewStub />}
      style={invertedStyle}
      // data={chatItems}
      data={chatItems.slice(0, 15)}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={loadMessages}
      onEndReachedThreshold={5}
      onViewableItemsChanged={onViewableItemsChanged}
      onScroll={onScroll}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={10}
      removeClippedSubviews
      ref={listRef}
      contentContainerStyle={ListUtils.containerStyle(theme)}
    />
  );
};

export default ChatViewList;
