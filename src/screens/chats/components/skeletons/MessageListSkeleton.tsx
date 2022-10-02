import React, {memo} from 'react';
import {MESSAGE_SKELETONS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import {Box} from 'native-base';
import MessageIncomingSkeleton from './MessageIncomingSkeleton';
import MessageOutcomingSkeleton from './MessageOutcomingSkeleton';

const ChatListSkeleton = () => {
  const indexArray = Array.from(Array(MESSAGE_SKELETONS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          <MessageIncomingSkeleton />
          <MessageOutcomingSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(ChatListSkeleton);
