import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const ContactSkeleton = () => {
  return (
    <FHStack w="100%" px="2" py="4" defaultSpace alignItems="center">
      <Skeleton w="48px" h="48px" rounded="full" />
      <FHStack grow space="2">
        <Skeleton w="40%" h="16px" rounded="xl" />
      </FHStack>
      <Skeleton w="36px" h="36px" rounded="full" />
    </FHStack>
  );
};

export default memo(ContactSkeleton);
