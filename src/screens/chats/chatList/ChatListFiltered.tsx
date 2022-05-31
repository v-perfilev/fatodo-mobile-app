import React, {ReactElement, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ListRenderItemInfo} from 'react-native';
import ChatListStub from './ChatListStub';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';
import {FlatList, useTheme} from 'native-base';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';

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
  const renderItem = useCallback((info: ListRenderItemInfo<Chat>): ReactElement => {
    return <ChatListItem chat={info.item} style={ListUtils.itemStyle(theme)} />;
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
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={loadFilteredChats}
        onEndReachedThreshold={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ListUtils.containerStyle(theme)}
      />
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
