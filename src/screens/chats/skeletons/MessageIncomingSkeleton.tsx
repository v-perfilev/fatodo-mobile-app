import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {MESSAGE_SKELETON_HEIGHT} from '../../../constants';

const MessageIncomingSkeleton = () => {
  return (
    <FHStack w="100%" h={`${MESSAGE_SKELETON_HEIGHT}px`} px="4" alignItems="center">
      <FHStack w="100%" space="3">
        <Skeleton mt="2" w="35px" h="35px" rounded="full" />
        <Skeleton w="65%" h="69px" rounded="xl" />
      </FHStack>
    </FHStack>
  );
};

export default memo(MessageIncomingSkeleton);
