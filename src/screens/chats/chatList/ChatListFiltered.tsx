import React, {ReactElement, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {LayoutChangeEvent} from 'react-native';
import ChatListStub from './ChatListStub';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';
import {Box, useTheme} from 'native-base';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';

type ChatListFilteredProps = {
  filter: string;
};

const ChatListFiltered = ({filter}: ChatListFilteredProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);
  const [loading, setLoading] = useDelayedState();

  const load = async (): Promise<void> => {
    await dispatch(ChatsThunks.fetchFilteredChats(filter));
  };

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback(
    (chat: Chat, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <ChatListItem chat={chat} />
      </Box>
    ),
    [],
  );

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [filter]);

  return (
    <ConditionalSpinner loading={loading}>
      <FlatList
        ListEmptyComponent={<ChatListStub />}
        data={filteredChats}
        render={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={load}
        refresh={load}
      />
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
