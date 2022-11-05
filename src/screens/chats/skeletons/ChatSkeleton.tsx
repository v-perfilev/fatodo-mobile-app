import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import FVStack from '../../../components/boxes/FVStack';
import {CHAT_SKELETON_HEIGHT} from '../../../constants';

const ChatSkeleton = () => {
  return (
    <FHStack w="100%" h={`${CHAT_SKELETON_HEIGHT}px`} px="3" py="3.5" defaultSpace alignItems="center">
      <Skeleton w="48px" h="48px" rounded="full" />
      <FVStack grow space="3">
        <FHStack grow space="2" justifyContent="space-between">
          <Skeleton w="40%" h="14px" rounded="xl" />
          <Skeleton w="55px" h="12px" rounded="xl" />
        </FHStack>
        <Skeleton w="60%" h="12px" rounded="xl" />
      </FVStack>
    </FHStack>
  );
};

export default memo(ChatSkeleton);
