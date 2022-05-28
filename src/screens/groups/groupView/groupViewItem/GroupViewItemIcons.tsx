import React from 'react';
import {Item} from '../../../../models/Item';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import GroupViewItemStatus from './GroupViewItemStatus';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';

type GroupViewItemIconsProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemIcons = ({item, canEdit}: GroupViewItemIconsProps) => {
  return (
    <FHStack smallSpace alignItems="center">
      <GroupViewItemStatus item={item} canEdit={canEdit} />
      <FVStack space="1.5">
        <TypeView type={item.type} withoutText size="sm" />
        <PriorityView priority={item.priority} withoutText size="sm" />
      </FVStack>
    </FHStack>
  );
};

export default GroupViewItemIcons;
