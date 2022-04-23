import React, {FC, useMemo} from 'react';
import {GROUP_ITEMS_COUNT} from '../../../../constants';
import GroupViewItemSkeleton from './GroupViewItemSkeleton';
import {VStack} from 'native-base';

const GroupViewItemsSkeleton: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(GROUP_ITEMS_COUNT).keys()), []);

  return (
    <VStack mt="1" mb="-1">
      {indexArray.map((index) => (
        <GroupViewItemSkeleton key={index} />
      ))}
    </VStack>
  );
};

export default GroupViewItemsSkeleton;
