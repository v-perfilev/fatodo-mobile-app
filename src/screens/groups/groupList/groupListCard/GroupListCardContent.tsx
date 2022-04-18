import React, {FC, memo} from 'react';
import {Box, HStack, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {Item} from '../../../../models/Item';
import GroupListCardSkeleton from '../groupListCardSkeleton/GroupListCardSkeleton';
import GroupListCardInfo from './GroupListCardInfo';
import GroupListCardItem from '../groupListCardItem/GroupListCardItem';

type GroupListCardContentProps = {
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent: FC<GroupListCardContentProps> = ({items, count, loading}) => {
  return (
    <Box bg="white" borderWidth="1" borderColor="gray.200" borderRadius="3">
      {loading && <GroupListCardSkeleton />}
      {!loading && count > 0 && (
        <VStack mx="2" mt="1" mb="-1">
          {items.map((item) => (
            <GroupListCardItem item={item} key={item.id} />
          ))}
        </VStack>
      )}
      {!loading && (
        <HStack mx="2" my="2" alignItems="center">
          <GroupListCardInfo items={items} count={count} />
        </HStack>
      )}
    </Box>
  );
};

export default flowRight([memo])(GroupListCardContent);
