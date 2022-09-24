import React from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const ContactSkeleton = () => {
  return (
    <FHStack w="100%" px="2" py="4" defaultSpace alignItems="center">
      <Skeleton w="48px" h="48px" rounded="3xl" />
      <FHStack grow space="2">
        <Skeleton w="40%" h="16px" />
      </FHStack>
      <Skeleton w="36px" h="36px" rounded="3xl" />
    </FHStack>
  );
};

export default ContactSkeleton;
