import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {CONTACT_SKELETON_HEIGHT} from '../../../constants';

const ContactSkeleton = () => {
  return (
    <FHStack w="100%" h={`${CONTACT_SKELETON_HEIGHT}px`} px="3" defaultSpace alignItems="center">
      <Skeleton w="48px" h="48px" rounded="full" />
      <FHStack grow space="2">
        <Skeleton w="50%" h="16px" rounded="xl" />
      </FHStack>
      <Skeleton w="25px" h="25px" rounded="full" />
    </FHStack>
  );
};

export default memo(ContactSkeleton);
