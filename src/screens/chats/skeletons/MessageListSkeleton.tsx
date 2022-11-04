import React, {memo} from 'react';
import {HEADER_HEIGHT, MESSAGE_SKELETON_HEIGHT, TAB_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import {Box} from 'native-base';
import MessageIncomingSkeleton from './MessageIncomingSkeleton';
import MessageOutcomingSkeleton from './MessageOutcomingSkeleton';
import {Dimensions} from 'react-native';

const ChatListSkeleton = () => {
  const height = Dimensions.get('window').height - HEADER_HEIGHT - TAB_HEIGHT;
  const count = Math.ceil(height / MESSAGE_SKELETON_HEIGHT / 2);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack py="1" justifyContent="flex-end">
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
