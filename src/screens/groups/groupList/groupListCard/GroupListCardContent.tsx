import React, {FC, memo, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, Text, VStack} from 'native-base';
import {Item} from '../../../../models/Item';
import {useGroupListItemsContext} from '../../../../shared/contexts/listContexts/groupListItemsContext';
import {flowRight} from 'lodash';

type GroupListCardContentProps = {
  items: Item[];
  count: number;
};

const GroupListCardContent: FC<GroupListCardContentProps> = ({items, count}) => {
  const {group} = useGroupViewContext();
  const {loading: listLoading} = useGroupListItemsContext();

  const loading = useMemo<boolean>(() => {
    return group && listLoading.has(group.id) ? listLoading.get(group.id) : false;
  }, [group, listLoading]);

  return (
    <Box bg="white">
      {!loading && count > 0 && (
        <VStack py="1">
          {items.map((item) => (
            <Box px="2" py="1" key={item.id}>
              <Text>{item.title}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default flowRight([memo])(GroupListCardContent);
