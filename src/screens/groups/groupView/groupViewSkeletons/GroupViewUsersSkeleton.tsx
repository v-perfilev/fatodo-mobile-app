import React from 'react';
import {Skeleton} from 'native-base';

const GroupViewUsersSkeleton = () => {
  return (
    <>
      <Skeleton w="80px" h="28px" rounded="md" mr="1.5" mb="1.5" />
      <Skeleton w="80px" h="28px" rounded="md" mr="1.5" mb="1.5" />
      <Skeleton w="80px" h="28px" rounded="md" mr="1.5" mb="1.5" />
    </>
  );
};

export default GroupViewUsersSkeleton;
