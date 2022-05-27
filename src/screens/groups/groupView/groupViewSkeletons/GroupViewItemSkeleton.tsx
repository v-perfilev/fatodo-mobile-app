import React from 'react';
import {Skeleton} from 'native-base';
import FHStack from '../../../../components/surfaces/FHStack';
import FVStack from '../../../../components/surfaces/FVStack';

const GroupViewItemSkeleton = () => {
  return (
    <FHStack space="2" p="1" borderWidth="1" borderColor="gray.100" borderRadius="2" alignItems="center">
      <FHStack smallSpace alignItems="center">
        <Skeleton w="24px" h="24px" rounded="lg" />
        <FVStack space="2">
          <Skeleton w="12px" h="12px" rounded="md" />
          <Skeleton w="12px" h="12px" rounded="md" />
        </FVStack>
      </FHStack>
      <FVStack grow space="1.5" justifyContent="center">
        <Skeleton.Text size="14" lines={1} />
        <Skeleton.Text size="11" lines={1} w="30%" />
      </FVStack>
      <Skeleton w="24px" h="24px" rounded="lg" />
    </FHStack>
  );
};

export default GroupViewItemSkeleton;
