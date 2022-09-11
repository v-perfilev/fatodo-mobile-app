import React, {memo} from 'react';
import {Item} from '../../../../models/Item';
import {Box, IBoxProps, Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Group} from '../../../../models/Group';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import GroupItemMenu from './GroupItemMenu';
import GroupItemChanges from './GroupItemChanges';
import BoxWithIcon from '../../../../components/surfaces/BoxWithIcon';

type GroupItemProps = IBoxProps & {
  item: Item;
  group: Group;
  canEdit: boolean;
};

const GroupItem = ({item, group, canEdit, ...props}: GroupItemProps) => {
  return (
    <FVStack p="4" defaultSpace {...props}>
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
        <BoxWithIcon icon={<CommentsIcon color="primary.500" size="md" />}>0</BoxWithIcon>
      </Box>
    </FVStack>
  );
};

export default memo(GroupItem);
