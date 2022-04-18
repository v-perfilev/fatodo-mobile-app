import React, {FC} from 'react';
import {Item} from '../../../../models/Item';
import {HStack, Text, VStack} from 'native-base';
import GroupListCardItemIcons from './GroupListCardItemIcons';
import GroupListCardItemChanges from './GroupListCardItemChanges';
import GroupListCardItemMenu from './GroupListCardItemMenu';

type GroupListCardItemProps = {
  item: Item;
};

const GroupListCardItem: FC<GroupListCardItemProps> = ({item}) => {
  return (
    <HStack my="1" px="1" py="1" borderWidth="1" borderColor="gray.200" borderRadius="2">
      <GroupListCardItemIcons item={item} />
      <VStack flex="1" ml="1">
        <Text isTruncated>{item.title}</Text>
        <GroupListCardItemChanges item={item} />
      </VStack>
      <GroupListCardItemMenu item={item} />
    </HStack>
  );
};

export default GroupListCardItem;
