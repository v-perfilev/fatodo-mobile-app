import React, {memo} from 'react';
import {CHAT_SKELETON_HEIGHT, HEADER_HEIGHT, TAB_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import Separator from '../../../components/layouts/Separator';
import {Box} from 'native-base';
import ChatSkeleton from './ChatSkeleton';
import {Dimensions} from 'react-native';

const ChatListSkeleton = () => {
  const height = Dimensions.get('window').height - HEADER_HEIGHT - TAB_HEIGHT;
  const count = Math.ceil(height / CHAT_SKELETON_HEIGHT);
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
