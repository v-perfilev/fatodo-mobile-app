import React, {Box} from 'native-base';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';

type ChatListFilteredProps = {
  filter: string;
};

const ChatListFiltered = ({filter}: ChatListFilteredProps) => {
  const [loading, setLoading] = useLoadingState();

  return (
    <ConditionalSpinner loading={loading}>
      <Box>{filter}</Box>
    </ConditionalSpinner>
  );
};

export default ChatListFiltered;
