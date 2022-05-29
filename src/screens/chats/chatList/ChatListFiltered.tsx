import React, {ReactElement, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import ChatListStub from './ChatListStub';
import ChatsThunks from '../../../store/chats/chatsThunks';
import {Chat} from '../../../models/Chat';
import ChatListItem from './ChatListItem';
import {FlatList, Theme, useTheme} from 'native-base';
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
  const [loading, setLoading] = useDelayedState();
  const filteredChats = useAppSelector(ChatsSelectors.filteredChats);

  const showStub = useMemo<boolean>(() => filteredChats.length === 0, [filteredChats]);

  const loadFilteredChats = (): void => {
    dispatch(ChatsThunks.fetchFilteredChats(filter))
      .unwrap()
      .finally(() => setLoading(false));
  };

  const keyExtractor = useCallback((chat: Chat): string => chat.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<Chat>): ReactElement => {
    return <ChatListItem chat={info.item} />;
  }, []);

  useEffect(() => {
    setLoading(true);
    loadFilteredChats();
  }, [filter]);

  return (
    <ConditionalSpinner loading={loading}>
      {showStub ? (
        <ChatListStub />
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadFilteredChats}
          onEndReachedThreshold={5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={containerStyle(theme)}
        />
      )}
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
