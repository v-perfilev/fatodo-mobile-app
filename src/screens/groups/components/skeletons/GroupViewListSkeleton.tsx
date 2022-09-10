import React, {memo} from 'react';
import {GROUP_ITEMS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import GroupItemSkeleton from './GroupItemSkeleton';
import {Box} from 'native-base';
import Separator from '../../../../components/layouts/Separator';

const GroupListCardSkeleton = () => {
  const indexArray = Array.from(Array(GROUP_ITEMS_COUNT).keys());

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
