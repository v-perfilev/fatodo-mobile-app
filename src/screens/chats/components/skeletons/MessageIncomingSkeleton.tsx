import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const MessageIncomingSkeleton = () => {
  return (
    <FHStack w="100%" px="2" py="4" defaultSpace>
      <Skeleton mt="2" w="35px" h="35px" rounded="3xl" />
      <Skeleton w="65%" h="60px" />
    </FHStack>
  );
};

export default memo(MessageIncomingSkeleton);
