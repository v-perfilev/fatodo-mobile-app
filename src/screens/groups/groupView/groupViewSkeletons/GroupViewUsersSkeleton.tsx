import React, {FC} from 'react';
import {Flex, Skeleton} from 'native-base';

const GroupViewUsersSkeleton: FC = () => {
  return (
    <Flex m="1" flexDirection="row" flexWrap="wrap">
      <Skeleton w="100" h="7" rounded="md" mr="1.5" mb="1.5" />
      <Skeleton w="100" h="7" rounded="md" mr="1.5" mb="1.5" />
      <Skeleton w="100" h="7" rounded="md" mr="1.5" mb="1.5" />
    </Flex>
  );
};

export default GroupViewUsersSkeleton;
