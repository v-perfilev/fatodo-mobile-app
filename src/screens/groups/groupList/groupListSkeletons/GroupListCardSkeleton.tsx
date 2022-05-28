import React, {useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../../../constants';
import GroupListCardInfoSkeleton from './GroupListCardInfoSkeleton';
import GroupListCardItemSkeleton from './GroupListCardItemSkeleton';
import FVStack from '../../../../components/boxes/FVStack';

const GroupListCardSkeleton = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <FVStack>
      <FVStack mt="2" space="2">
        {indexArray.map((index) => (
          <GroupListCardItemSkeleton key={index} />
        ))}
      </FVStack>
      <GroupListCardInfoSkeleton />
    </FVStack>
  );
};

export default GroupListCardSkeleton;
