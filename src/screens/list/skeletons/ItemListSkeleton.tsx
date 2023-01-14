import React, {memo} from 'react';
import {HEADER_HEIGHT, ITEM_LIST_ITEM_SKELETON_HEIGHT, TAB_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import ItemListItemSkeleton from './ItemListItemSkeleton';
import {Box} from 'native-base';
import Separator from '../../../components/layouts/Separator';
import {Dimensions} from 'react-native';

const GroupListCardSkeleton = () => {
  const height = Dimensions.get('window').height - HEADER_HEIGHT - TAB_HEIGHT;
  const count = Math.ceil(height / ITEM_LIST_ITEM_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <ItemListItemSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
