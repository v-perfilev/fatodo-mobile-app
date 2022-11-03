import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack p="4" h="50px" justifyContent="space-between" alignItems="center">
      <Skeleton w="30px" h="30px" rounded="full" />
      <Skeleton w="100px" h="12px" rounded="xl" />
      <Skeleton w="50px" h="22px" rounded="xl" />
    </FHStack>
  );
};

export default memo(GroupListCardInfoSkeleton);
