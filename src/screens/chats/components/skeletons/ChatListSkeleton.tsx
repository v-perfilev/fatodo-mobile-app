import React, {memo} from 'react';
import {CHATS_SKELETONS_HEIGHT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';
import ChatSkeleton from './ChatSkeleton';
import {Dimensions} from 'react-native';

const ChatListSkeleton = () => {
  const height = Dimensions.get('window').height;
  const count = Math.round(height / CHATS_SKELETONS_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

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
