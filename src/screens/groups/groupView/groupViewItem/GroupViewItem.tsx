import React from 'react';
import {Pressable, Text} from 'native-base';
import {Item} from '../../../../models/Item';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import GroupViewItemIcons from './GroupViewItemIcons';
import GroupViewItemChanges from './GroupViewItemChanges';
import GroupViewItemMenu from './GroupViewItemMenu';
import FVStack from '../../../../components/surfaces/FVStack';
import FHStack from '../../../../components/surfaces/FHStack';

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
    <Pressable onPress={goToItemView}>
      <FHStack space="2" p="1" borderWidth="1" borderColor="gray.200" borderRadius="2" alignItems="center">
        <GroupViewItemIcons item={item} canEdit={canEdit} />
        <FVStack grow>
          <Text isTruncated lineHeight="18">
            {item.title}
          </Text>
          <GroupViewItemChanges item={item} />
        </FVStack>
        <GroupViewItemMenu item={item} canEdit={canEdit} />
      </FHStack>
    </Pressable>
  );
};

export default GroupViewItem;
