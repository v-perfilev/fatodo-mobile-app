import React, {memo} from 'react';
import {CHATS_SKELETONS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';
import ChatSkeleton from './ChatSkeleton';

const ChatListSkeleton = () => {
  const indexArray = Array.from(Array(CHATS_SKELETONS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <ChatSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(ChatListSkeleton);
