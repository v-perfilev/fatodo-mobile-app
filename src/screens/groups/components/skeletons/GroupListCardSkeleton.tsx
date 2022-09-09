import React from 'react';
import {CARD_ITEMS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import GroupItemSkeleton from './GroupItemSkeleton';
import GroupListCardInfoSkeleton from './GroupListCardInfoSkeleton';

const GroupListCardSkeleton = () => {
  const indexArray = Array.from(Array(CARD_ITEMS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <GroupItemSkeleton key={index} />
      ))}
      <GroupListCardInfoSkeleton />
    </FVStack>
  );
};

export default GroupListCardSkeleton;
