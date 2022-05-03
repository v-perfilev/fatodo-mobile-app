import React, {ReactElement, useMemo} from 'react';
import {Box, HStack, VStack} from 'native-base';
import {Item} from '../../../../models/Item';
import GroupListCardSkeleton from '../groupListSkeletons/GroupListCardSkeleton';
import GroupListCardInfo from './GroupListCardInfo';
import GroupListCardItem from '../groupListCardItem/GroupListCardItem';
import {Group} from '../../../../models/Group';

type GroupListCardContentProps = {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent = ({group, items, count, loading}: GroupListCardContentProps) => {
  const skeleton = useMemo<ReactElement>(() => <GroupListCardSkeleton />, []);

  const itemsView = (
    <VStack mx="2" mt="1" mb="-1">
      {items.map((item) => (
        <GroupListCardItem item={item} key={item.id} />
      ))}
    </VStack>
  );

  const groupInfo = (
    <HStack mx="2" my="2" alignItems="center">
      <GroupListCardInfo group={group} items={items} count={count} />
    </HStack>
  );

  return (
    <Box bg="white" borderWidth="1" borderColor="gray.200" borderBottomRadius="3">
      {loading && skeleton}
      {!loading && count > 0 && itemsView}
      {!loading && groupInfo}
    </Box>
  );
};

export default GroupListCardContent;
