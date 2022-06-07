import React, {Dispatch, MutableRefObject, ReactElement, SetStateAction, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import {LayoutChangeEvent, ViewToken} from 'react-native';
import ChatViewItem from './ChatViewItem';
import {ChatItem} from '../../../models/ChatItem';
import {useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ChatViewStub from './ChatViewStub';
import FlatList, {FlatListType} from '../../../components/surfaces/FlatList';

type ChatViewListProps = {
  loadMessages: () => void;
  onViewableItemsChanged: (info: {viewableItems: ViewToken[]; changed: ViewToken[]}) => void;
  setIsOnTheTop: Dispatch<SetStateAction<boolean>>;
  listRef: MutableRefObject<FlatListType>;
};

const ChatViewList = ({loadMessages, onViewableItemsChanged, setIsOnTheTop, listRef}: ChatViewListProps) => {
  const theme = useTheme();
  const chatItems = useAppSelector(ChatSelectors.chatItems);

  const keyExtractor = useCallback((item: ChatItem): string => item.message?.id || item.date, []);
  const renderItem = useCallback((item: ChatItem, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
    return <ChatViewItem onLayout={onLayout} item={item} style={ListUtils.itemInvertedStyle(theme)} />;
  }, []);

  return (
    <FlatList
      ListEmptyComponent={<ChatViewStub style={ListUtils.invertedStyle} />}
      data={chatItems}
      renderItemWithLayout={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={loadMessages}
      onViewableItemsChanged={onViewableItemsChanged}
      setIsOnTheTop={setIsOnTheTop}
      listRef={listRef}
      style={ListUtils.invertedStyle}
      contentContainerStyle={ListUtils.containerInvertedStyle(theme)}
    />
  );
};

export default ChatViewList;
