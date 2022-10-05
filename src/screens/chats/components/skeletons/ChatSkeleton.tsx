import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';

const ChatSkeleton = () => {
  return (
    <FHStack w="100%" h="64px" px="2" py="4" defaultSpace alignItems="center">
      <Skeleton w="48px" h="48px" rounded="3xl" />
      <FVStack grow space="2">
        <FHStack grow space="2" justifyContent="space-between">
          <Skeleton w="40%" h="14px" />
          <Skeleton w="55px" h="12px" />
        </FHStack>
        <Skeleton w="60%" h="12px" />
      </FVStack>
    </FHStack>
  );
};

export default memo(ChatSkeleton);