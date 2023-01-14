import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {ITEM_LIST_ITEM_SKELETON_HEIGHT} from '../../../constants';

const ItemListItemSkeleton = () => {
  return (
    <FHStack h={`${ITEM_LIST_ITEM_SKELETON_HEIGHT}px`} px="4" py="5" space="3" alignItems="center">
      <Skeleton w="30px" h="30px" rounded="md" />
      <FVStack grow space="2" justifyContent="center">
        <Skeleton w="80%" h="20px" rounded="xl" />
        <Skeleton w="30%" h="20px" rounded="xl" />
      </FVStack>
      <FVStack h="100%" justifyContent="space-between" alignItems="flex-end" space="3">
        <Skeleton w="50px" h="12px" rounded="xl" />
        <FHStack space="3">
          <Skeleton w="20px" h="20px" rounded="md" />
          <Skeleton w="27px" h="20px" rounded="md" />
          <Skeleton w="27px" h="20px" rounded="md" />
        </FHStack>
      </FVStack>
    </FHStack>
  );
};

export default memo(ItemListItemSkeleton);
