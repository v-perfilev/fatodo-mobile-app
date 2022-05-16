import React from 'react';
import {Item} from '../../../../models/Item';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import FVStack from '../../../../components/surfaces/FVStack';
import FHStack from '../../../../components/surfaces/FHStack';

type GroupListCardItemIconsProps = {
  item: Item;
};

const GroupListCardItemIcons = ({item}: GroupListCardItemIconsProps) => {
  return (
    <FHStack space="1" alignItems="center">
      <StatusView statusType={item.status} size="lg" />
      <FVStack space="1.5">
        <TypeView type={item.type} withoutText size="sm" />
        <PriorityView priority={item.priority} withoutText size="sm" />
      </FVStack>
    </FHStack>
  );
};

export default GroupListCardItemIcons;
