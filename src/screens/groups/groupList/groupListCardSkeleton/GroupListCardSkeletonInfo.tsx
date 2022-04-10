import React, {FC} from 'react';
import {Box, Skeleton} from 'native-base';

const GroupListCardSkeletonInfo: FC = () => {
  return (
    <>
      <Skeleton w="20" h="8" rounded="lg" />
      <Box flex="1" />
      <Skeleton w="6" h="6" rounded="lg" />
      <Skeleton.Text size="12" lines={1} w="3" ml="1" />
    </>
  );
};

export default GroupListCardSkeletonInfo;
