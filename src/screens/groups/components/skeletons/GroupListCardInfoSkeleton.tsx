import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack p="4" h="50px" justifyContent="space-between" alignItems="center">
      <Skeleton w="30px" h="30px" rounded="3xl" />
      <Skeleton w="100px" h="12px" />
      <Skeleton w="50px" h="22px" />
    </FHStack>
  );
};

export default memo(GroupListCardInfoSkeleton);
