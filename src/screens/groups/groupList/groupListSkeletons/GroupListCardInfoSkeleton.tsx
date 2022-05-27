import React from 'react';
import {Box, Skeleton} from 'native-base';
import FHStack from '../../../../components/surfaces/FHStack';

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack smallSpace h="45px" mx="0.5" alignItems="center">
      <Skeleton w="100px" h="30px" rounded="lg" />
      <Box flex="1" />
      <Skeleton w="24px" h="24px" rounded="lg" />
      <Skeleton.Text size="12" lines={1} w="15px" />
    </FHStack>
  );
};

export default GroupListCardInfoSkeleton;
