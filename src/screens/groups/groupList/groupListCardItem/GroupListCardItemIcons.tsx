import React, {FC} from 'react';
import {Item} from '../../../../models/Item';
import {Box, HStack, VStack} from 'native-base';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';

type GroupListCardItemIconsProps = {
  item: Item;
};

const GroupListCardItemIcons: FC<GroupListCardItemIconsProps> = ({item}) => {
  return (
    <HStack alignItems="center">
      <StatusView statusType={item.status} size="sm" />
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

export default GroupListCardItemIcons;
