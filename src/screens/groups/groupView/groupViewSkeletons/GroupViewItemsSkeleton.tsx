import React, {useMemo} from 'react';
import {GROUP_ITEMS_COUNT} from '../../../../constants';
import GroupViewItemSkeleton from './GroupViewItemSkeleton';
import {VStack} from 'native-base';

const GroupViewItemsSkeleton = () => {
  const indexArray = useMemo(() => Array.from(Array(GROUP_ITEMS_COUNT).keys()), []);

  return (
    <VStack space="2">
      {indexArray.map((index) => (
        <GroupViewItemSkeleton key={index} />
      ))}
    </VStack>
  );
};

export default GroupViewItemsSkeleton;
