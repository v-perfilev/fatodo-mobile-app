import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {EVENT_SKELETON_HEIGHT} from '../../../constants';

const EventSkeleton = () => {
  return (
    <FHStack w="100%" h={EVENT_SKELETON_HEIGHT} px="2" py="4" defaultSpace alignItems="flex-start">
      <Skeleton w="48px" h="48px" rounded="full" />
      <FVStack grow space="4" pt="1" justifyContent="center">
        <FHStack justifyContent="space-between">
          <Skeleton w="70%" h="14px" rounded="xl" />
          <Skeleton w="65px" h="12px" rounded="xl" />
        </FHStack>
        <Skeleton w="80%" h="14px" rounded="xl" />
        <Skeleton w="100%" h="28px" rounded="xl" />
      </FVStack>
    </FHStack>
  );
};

export default memo(EventSkeleton);
