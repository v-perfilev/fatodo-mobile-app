import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const MessageOutcomingSkeleton = () => {
  return (
    <FHStack w="100%" px="2" py="4" justifyContent="flex-end" defaultSpace alignItems="center">
      <Skeleton w="70%" h="60px" />
    </FHStack>
  );
};

export default memo(MessageOutcomingSkeleton);
