import React from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import GroupItemChanges from './GroupItemChanges';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Group} from '../../../../models/Group';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import GroupItemMenu from './GroupItemMenu';
import FBox from '../../../../components/boxes/FBox';

type GroupItemProps = {
  item: Item;
  group: Group;
  canEdit: boolean;
};

const GroupItem = ({item, group, canEdit}: GroupItemProps) => {
  return (
    <FVStack p="4" defaultSpace>
      <FHStack defaultSpace>
        <FBox flex="1" flexGrow="1">
          <FVStack defaultSpace>
            <Text fontSize="16" numberOfLines={2} isTruncated>
              {item.title}
            </Text>
            <GroupItemChanges item={item} />
          </FVStack>
        </FBox>
        <FBox flex="0">
          <GroupItemMenu group={group} item={item} canEdit={canEdit} />
        </FBox>
      </FHStack>
      <FVStack grow defaultSpace alignItems="center">
        <FHStack grow defaultSpace justifyContent="space-between" alignItems="center">
          <FHStack grow defaultSpace>
            <TypeView type={item.type} fontColor="gray.500" />
            <PriorityView priority={item.priority} fontColor="gray.500" />
            <StatusView statusType={item.status} fontColor="gray.500" />
          </FHStack>
          <FHStack smallSpace alignItems="center">
            <CommentsIcon size="md" color="primary.500" />
            <Text>100</Text>
          </FHStack>
        </FHStack>
      </FVStack>
    </FVStack>
  );
};

export default GroupItem;
