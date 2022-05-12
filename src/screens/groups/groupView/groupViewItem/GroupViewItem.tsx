import React from 'react';
import {HStack, Pressable, Text, VStack} from 'native-base';
import {Item} from '../../../../models/Item';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import GroupViewItemIcons from './GroupViewItemIcons';
import GroupViewItemChanges from './GroupViewItemChanges';
import GroupViewItemMenu from './GroupViewItemMenu';

type GroupViewItemProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItem = ({item, canEdit}: GroupViewItemProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToItemView = (): void => {
    navigation.navigate('ItemView', {itemId: item.id});
  };

  return (
    <VStack>
      <Pressable onPress={goToItemView}>
        <HStack px="1" py="1" borderWidth="1" borderColor="gray.200" borderRadius="2">
          <GroupViewItemIcons item={item} canEdit={canEdit} />
          <VStack flex="1" ml="1">
            <Text isTruncated>{item.title}</Text>
            <GroupViewItemChanges item={item} />
          </VStack>
          <GroupViewItemMenu item={item} canEdit={canEdit} />
        </HStack>
      </Pressable>
    </VStack>
  );
};

export default GroupViewItem;
