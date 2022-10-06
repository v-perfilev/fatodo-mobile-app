import React, {memo} from 'react';
import {ITEM_SKELETONS_HEIGHT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import GroupItemSkeleton from './GroupItemSkeleton';
import {Box} from 'native-base';
import Separator from '../../../../components/layouts/Separator';
import {Dimensions} from 'react-native';

const GroupListCardSkeleton = () => {
  const height = Dimensions.get('window').height;
  const count = Math.round(height / ITEM_SKELETONS_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <GroupItemSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
