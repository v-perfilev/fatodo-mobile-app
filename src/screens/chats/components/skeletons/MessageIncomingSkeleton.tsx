import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const MessageIncomingSkeleton = () => {
  return (
    <FHStack w="100%" p="2" defaultSpace>
      <Skeleton mt="2" w="35px" h="35px" rounded="full" />
      <Skeleton w="65%" h="60px" rounded="xl" />
    </FHStack>
  );
};

export default memo(MessageIncomingSkeleton);
