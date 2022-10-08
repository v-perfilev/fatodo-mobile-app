import React, {memo} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const EventSkeleton = () => {
  return (
    <FHStack w="100%" h="82" px="2" py="4" defaultSpace alignItems="flex-start">
      <Skeleton w="48px" h="48px" rounded="full" />
      <FVStack grow space="2">
        <FHStack grow justifyContent="space-between" alignItems="center">
          <Skeleton w="70%" h="16px" rounded="xl" />
          <Skeleton w="65px" h="12px" rounded="xl" />
        </FHStack>
        <Skeleton w="90%" h="14px" rounded="xl" />
      </FVStack>
    </FHStack>
  );
};

export default memo(EventSkeleton);
