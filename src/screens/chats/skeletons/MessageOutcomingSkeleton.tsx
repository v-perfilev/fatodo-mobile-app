import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {MESSAGE_SKELETON_HEIGHT} from '../../../constants';

const MessageOutcomingSkeleton = () => {
  return (
    <FHStack w="100%" h={`${MESSAGE_SKELETON_HEIGHT}px`} px="2" justifyContent="flex-end" alignItems="center">
      <Skeleton w="70%" h="69px" rounded="xl" />
    </FHStack>
  );
};

export default memo(MessageOutcomingSkeleton);
