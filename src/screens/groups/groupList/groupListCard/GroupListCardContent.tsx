import React, {FC, memo} from 'react';
import {Box, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {Item} from '../../../../models/Item';
import GroupListCardItem from '../groupListCardItem/GroupListCardItem';

type GroupListCardContentProps = {
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent: FC<GroupListCardContentProps> = ({items, count, loading}) => {
  return (
    <Box bg="white">
      {!loading && count > 0 && (
        <VStack py="1">
          {items.map((item) => (
            <GroupListCardItem item={item} key={item.id} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default flowRight([memo])(GroupListCardContent);
