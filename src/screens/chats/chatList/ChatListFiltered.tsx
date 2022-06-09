import React, {ReactElement, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {LayoutChangeEvent} from 'react-native';
import ChatListStub from './ChatListStub';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';
import {useTheme} from 'native-base';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';

type ChatListFilteredProps = {
  filter: string;
};

const ChatListFiltered = ({filter}: ChatListFilteredProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useDelayedState();
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);

  const loadFilteredChats = (): void => {
    dispatch(ChatsThunks.fetchFilteredChats(filter))
      .unwrap()
      .finally(() => setLoading(false));
  };

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback((chat: Chat, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
    return <ChatListItem onLayout={onLayout} chat={chat} style={ListUtils.itemStyle(theme)} />;
  }, []);

  useEffect(() => {
    setLoading(true);
    loadFilteredChats();
  }, [filter]);

  return (
    <ConditionalSpinner loading={loading}>
      <FlatList
        ListEmptyComponent={<ChatListStub />}
        data={filteredChats}
        renderItemWithLayout={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadFilteredChats}
      />
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
