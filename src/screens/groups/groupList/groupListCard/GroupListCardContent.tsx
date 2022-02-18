import React, {FC, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, VStack} from 'native-base';
import {Item} from '../../../../models/Item';
import {useGroupListItemsContext} from '../../../../shared/contexts/listContexts/groupListItemsContext';

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
    <Box flex="1" bg="white">
      {!loading && count > 0 && (
        <VStack flex="1">
          {items.map((item) => (
            <Box flex="1" key={item.id}>
              {item.title}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default GroupListCardContent;
