import React from 'react';
import {Item} from '../../../../models/Item';
import {Box, HStack, VStack} from 'native-base';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import GroupViewItemStatus from './GroupViewItemStatus';

type GroupViewItemIconsProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemIcons = ({item, canEdit}: GroupViewItemIconsProps) => {
  return (
    <HStack alignItems="center">
      <GroupViewItemStatus item={item} canEdit={canEdit} />
      <VStack mx="0.5">
        <Box m="0.5">
          <TypeView type={item.type} withoutText size="xs" />
        </Box>
        <Box m="0.5">
          <PriorityView priority={item.priority} withoutText size="xs" />
        </Box>
      </VStack>
    </HStack>
  );
};

export default GroupViewItemIcons;
