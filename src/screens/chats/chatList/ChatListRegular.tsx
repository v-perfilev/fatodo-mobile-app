import {Box, FlatList} from 'native-base';
import React, {ReactElement, useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import {Item} from '../../../models/Item';
import {ListRenderItemInfo} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsThunks from '../../../store/chats/chatsThunks';
import ChatsSelectors from '../../../store/chats/chatsSelectors';

type ChatListRegularProps = {};

const ChatListRegular = ({}: ChatListRegularProps) => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector(ChatsSelectors.chats);
  const [initialLoading, setInitialLoading] = useLoadingState();

  const loadChats = (): void => {
    dispatch(ChatsThunks.fetchChats(chats.length))
      .unwrap()
      .finally(() => setInitialLoading(false));
  };

  useEffect(() => {
    loadChats();
  }, []);

  const renderItem = (info: ListRenderItemInfo<Item>): ReactElement => {
    return <Box>{info.item}</Box>;
  };

  return (
    <ConditionalSpinner loading={initialLoading}>
      <Box>Test</Box>

      <FlatList data={[]} onEndReached={loadChats} onEndReachedThreshold={5} renderItem={renderItem} />
    </ConditionalSpinner>
  );
};

export default ChatListRegular;
