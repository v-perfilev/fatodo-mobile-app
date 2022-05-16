import React from 'react';
import {Skeleton} from 'native-base';

const GroupViewUsersSkeleton = () => {
  return (
    <>
      <Skeleton w="80px" h="30px" rounded="md" m="1.5" />
      <Skeleton w="80px" h="30px" rounded="md" m="1.5" />
      <Skeleton w="80px" h="30px" rounded="md" m="1.5" />
    </>
  );
};

export default GroupViewUsersSkeleton;
