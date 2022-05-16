import React, {useMemo} from 'react';
import {GROUP_ITEMS_COUNT} from '../../../../constants';
import GroupViewItemSkeleton from './GroupViewItemSkeleton';
import FVStack from '../../../../components/surfaces/FVStack';

const GroupViewItemsSkeleton = () => {
  const indexArray = useMemo(() => Array.from(Array(GROUP_ITEMS_COUNT).keys()), []);

  return (
    <FVStack space="2">
      {indexArray.map((index) => (
        <GroupViewItemSkeleton key={index} />
      ))}
    </FVStack>
  );
};

export default GroupViewItemsSkeleton;
