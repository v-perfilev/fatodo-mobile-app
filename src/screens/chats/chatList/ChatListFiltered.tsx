import React, {ReactElement, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ListRenderItemInfo, StyleProp, ViewStyle, VirtualizedList} from 'react-native';
import ChatListStub from './ChatListStub';
import ChatsThunks from '../../../store/chats/chatsThunks';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';
import {Theme, useTheme} from 'native-base';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../../constants';

const containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
  padding: theme.sizes[DEFAULT_SPACE],
  paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
  paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
});

type ChatListFilteredProps = {
  filter: string;
};

const ChatListFiltered = ({filter}: ChatListFilteredProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useLoadingState();
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);

  const loadFilteredChats = (): void => {
    dispatch(ChatsThunks.fetchFilteredChats(filter))
      .unwrap()
      .finally(() => setLoading(false));
  };

  const showStub = useMemo<boolean>(() => filteredChats.length === 0, [filteredChats]);

  useEffect(() => {
    setLoading(true);
    loadFilteredChats();
  }, [filter]);

  const renderItem = (info: ListRenderItemInfo<Chat>): ReactElement => <ChatListItem chat={info.item} />;
  const getItem = (chats: Chat[], index: number): Chat => chats[index];
  const getItemCount = (chats: Chat[]): number => chats.length;
  const keyExtractor = (chat: Chat): string => chat.id;

  return (
    <ConditionalSpinner loading={loading}>
      {showStub ? (
        <ChatListStub />
      ) : (
        <VirtualizedList
          data={filteredChats}
          renderItem={renderItem}
          getItem={getItem}
          getItemCount={getItemCount}
          keyExtractor={keyExtractor}
          contentContainerStyle={containerStyle(theme)}
        />
      )}
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
