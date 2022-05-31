import React, {useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import FBox from '../../../../components/boxes/FBox';

const GroupListCardItemSkeleton = () => {
  return (
    <FHStack space="2" p="1" borderWidth="1" borderColor="gray.100" borderRadius="2" alignItems="center">
      <FHStack smallSpace alignItems="center">
        <Skeleton w="24px" h="24px" rounded="lg" />
        <FVStack space="2">
          <Skeleton w="12px" h="12px" rounded="md" />
          <Skeleton w="12px" h="12px" rounded="md" />
        </FVStack>
      </FHStack>
      <FVStack grow space="1.5" justifyContent="center">
        <Skeleton.Text size="14" lines={1} />
        <Skeleton.Text size="11" lines={1} w="30%" />
      </FVStack>
      <Skeleton w="24px" h="24px" rounded="lg" />
    </FHStack>
  );
};

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack smallSpace h="45px" mx="0.5" alignItems="center">
      <Skeleton w="100px" h="30px" rounded="lg" />
      <FBox />
      <Skeleton w="24px" h="24px" rounded="lg" />
      <Skeleton.Text size="12" lines={1} w="15px" />
    </FHStack>
  );
};

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
