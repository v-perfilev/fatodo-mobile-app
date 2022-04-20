import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../../../constants';
import GroupListCardInfoSkeleton from './GroupListCardInfoSkeleton';
import GroupListCardItemSkeleton from './GroupListCardItemSkeleton';
import {HStack, VStack} from 'native-base';

const GroupListCardSkeleton: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      <VStack mx="2" mt="1" mb="-1">
        {indexArray.map((index) => (
          <GroupListCardItemSkeleton key={index} />
        ))}
      </VStack>
      <HStack mx="2" my="2" alignItems="center">
        <GroupListCardInfoSkeleton />
      </HStack>
    </>
  );
};

export default GroupListCardSkeleton;
