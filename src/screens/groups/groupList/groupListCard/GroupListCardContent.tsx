import React, {FC, memo} from 'react';
import {Box, HStack, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {Item} from '../../../../models/Item';
import GroupListCardItem from '../groupListCardItem/GroupListCardItem';
import GroupListCardInfo from './GroupListCardInfo';

type GroupListCardContentProps = {
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent: FC<GroupListCardContentProps> = ({items, count, loading}) => {
  return (
    <Box bg="white">
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
