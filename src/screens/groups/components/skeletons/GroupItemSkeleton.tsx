import React, {memo} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import FBox from '../../../../components/boxes/FBox';

const GroupItemSkeleton = () => {
  return (
    <FVStack h="118" px="4" py="5" space="4">
      <FHStack alignItems="center">
        <FBox flex="1" flexGrow="1">
          <Skeleton w="90%" h="16px" rounded="xl" />
        </FBox>
        <FBox flex="0">
          <Skeleton w="25px" h="25px" rounded="full" />
        </FBox>
      </FHStack>
      <Skeleton w="150px" h="12px" rounded="xl" />
      <FHStack grow justifyContent="space-between" alignItems="center">
        <Skeleton w="200px" h="14px" rounded="xl" />
        <Skeleton w="50px" h="20px" rounded="xl" />
      </FHStack>
    </FVStack>
  );
};

export default memo(GroupItemSkeleton);
