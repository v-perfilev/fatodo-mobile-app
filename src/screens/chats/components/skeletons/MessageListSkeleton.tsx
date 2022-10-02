import React, {memo} from 'react';
import {CHAT_ITEMS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';
import MessageIncomingSkeleton from './MessageIncomingSkeleton';
import MessageOutcomingSkeleton from './MessageOutcomingSkeleton';

const ChatListSkeleton = () => {
  const indexArray = Array.from(Array(CHAT_ITEMS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <MessageIncomingSkeleton />
          <Separator />
          <MessageOutcomingSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(ChatListSkeleton);
