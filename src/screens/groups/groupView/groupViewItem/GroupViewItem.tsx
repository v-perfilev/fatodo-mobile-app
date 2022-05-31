import React from 'react';
import {Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import GroupViewItemIcons from './GroupViewItemIcons';
import GroupViewItemChanges from './GroupViewItemChanges';
import GroupViewItemMenuButton from './GroupViewItemMenuButton';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import {Item} from '../../../../models/Item';
import PressableButton from '../../../../components/controls/PressableButton';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';

type GroupViewItemProps = IPressableProps & {
  item: Item;
  canEdit: boolean;
};

const GroupViewItem = ({item, canEdit, ...props}: GroupViewItemProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const group = useAppSelector(GroupSelectors.group);

  const goToItemView = (): void => navigation.navigate('ItemView', {group, item});

  return (
    <PressableButton onPress={goToItemView} {...props}>
      <FHStack space="2" p="1" borderWidth="1" borderColor="gray.200" borderRadius="2" alignItems="center">
        <GroupViewItemIcons item={item} canEdit={canEdit} />
        <FVStack grow>
          <Text isTruncated lineHeight="18">
            {item.title}
          </Text>
          <GroupViewItemChanges item={item} />
        </FVStack>
        <GroupViewItemMenuButton item={item} canEdit={canEdit} />
      </FHStack>
    </PressableButton>
  );
};

export default GroupViewItem;
