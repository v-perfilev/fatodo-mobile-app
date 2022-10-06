import React, {memo} from 'react';
import {MESSAGE_SKELETONS_HEIGHT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import {Box} from 'native-base';
import MessageIncomingSkeleton from './MessageIncomingSkeleton';
import MessageOutcomingSkeleton from './MessageOutcomingSkeleton';
import {Dimensions} from 'react-native';

const ChatListSkeleton = () => {
  const height = Dimensions.get('window').height;
  const count = Math.round(height / MESSAGE_SKELETONS_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

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
