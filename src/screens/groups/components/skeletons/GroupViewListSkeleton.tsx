import React from 'react';
import {GROUP_ITEMS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import GroupItemSkeleton from './GroupItemSkeleton';
import {Box, Divider} from 'native-base';

const GroupListCardSkeleton = () => {
  const indexArray = Array.from(Array(GROUP_ITEMS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Divider bg="gray.200" />}
          <GroupItemSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default GroupListCardSkeleton;
