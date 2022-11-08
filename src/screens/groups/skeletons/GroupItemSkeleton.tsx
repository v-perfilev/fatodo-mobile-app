import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import FBox from '../../../components/boxes/FBox';
import {ITEM_SKELETON_HEIGHT} from '../../../constants';

const GroupItemSkeleton = () => {
  return (
    <FVStack h={`${ITEM_SKELETON_HEIGHT}px`} px="4" py="5" space="4">
      <FHStack alignItems="center">
        <FBox>
          <Skeleton w="90%" h="16px" rounded="xl" />
        </FBox>
        <FBox grow={false}>
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
