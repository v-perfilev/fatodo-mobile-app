import React from 'react';
import {Item} from '../../../../models/Item';
import {Box, Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Group} from '../../../../models/Group';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import GroupItemMenu from './GroupItemMenu';
import GroupItemChanges from './GroupItemChanges';

type GroupItemProps = {
  item: Item;
  group: Group;
  canEdit: boolean;
};

const GroupItem = ({item, group, canEdit}: GroupItemProps) => {
  return (
    <FVStack p="4" defaultSpace>
      <FHStack>
        <FVStack grow defaultSpace>
          <Text fontSize="16" numberOfLines={2} isTruncated>
            {item.title}
          </Text>
          <GroupItemChanges item={item} />
        </FVStack>
        <Box>
          <GroupItemMenu group={group} item={item} canEdit={canEdit} />
        </Box>
      </FHStack>
      <Box flexDirection="row">
        <FHStack grow defaultSpace>
          <TypeView type={item.type} fontColor="gray.500" />
          <PriorityView priority={item.priority} fontColor="gray.500" />
          <StatusView statusType={item.status} fontColor="gray.500" />
        </FHStack>
        <FHStack smallSpace>
          <CommentsIcon size="md" color="primary.500" />
          <Text>100</Text>
        </FHStack>
      </Box>
    </FVStack>
  );
};

export default GroupItem;
