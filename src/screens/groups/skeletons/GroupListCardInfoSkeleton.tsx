import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack p="4" h="50px" justifyContent="space-between" alignItems="center">
      <Skeleton w="30px" h="30px" rounded="full" />
      <Skeleton w="100px" h="12px" rounded="xl" />
      <FHStack space="3">
        <Skeleton w="27px" h="20px" rounded="md" />
        <Skeleton w="27px" h="20px" rounded="md" />
      </FHStack>
    </FHStack>
  );
};

export default memo(GroupListCardInfoSkeleton);
