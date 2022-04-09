import React, {FC} from 'react';
import {Item} from '../../../../models/Item';
import {Box, HStack, Text, VStack} from 'native-base';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';

type GroupListCardItemProps = {
  item: Item;
};

const GroupListCardItem: FC<GroupListCardItemProps> = ({item}) => {
  return (
    <HStack mx="2" my="1" px="1" py="1" borderWidth="1" borderColor="gray.100" borderRadius="2">
      <HStack verticalAlign="center">
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
      <Text>{item.title}</Text>
    </HStack>
  );
};

export default GroupListCardItem;
