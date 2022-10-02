import React, {memo} from 'react';
import {GROUP_ITEM_SKELETONS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import GroupItemSkeleton from './GroupItemSkeleton';
import GroupListCardInfoSkeleton from './GroupListCardInfoSkeleton';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';

const GroupListCardSkeleton = () => {
  const indexArray = Array.from(Array(GROUP_ITEM_SKELETONS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <GroupItemSkeleton />
        </Box>
      ))}
      <GroupListCardInfoSkeleton />
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
