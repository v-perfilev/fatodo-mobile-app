import React from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import FBox from '../../../../components/boxes/FBox';

const GroupItemSkeleton = () => {
  return (
    <FVStack p="4" py="5" space="4">
      <FHStack space="4">
        <FBox flex="1" flexGrow="1">
          <FVStack space="4">
            <Skeleton w="90%" h="16px" rounded="md" />
            <Skeleton w="120px" h="12px" rounded="md" />
          </FVStack>
        </FBox>
        <FBox flex="0">
          <Skeleton w="30px" h="30px" rounded="3xl" />
        </FBox>
      </FHStack>
      <FHStack grow justifyContent="space-between" alignItems="center">
        <Skeleton w="200px" h="16px" rounded="md" />
        <Skeleton w="50px" h="22px" rounded="md" />
      </FHStack>
    </FVStack>
  );
};

export default GroupItemSkeleton;
