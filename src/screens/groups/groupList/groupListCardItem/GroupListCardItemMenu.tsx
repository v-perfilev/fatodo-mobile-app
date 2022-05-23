import React from 'react';
import {Item} from '../../../../models/Item';
import PressableButton from '../../../../components/controls/PressableButton';
import EyeIcon from '../../../../components/icons/EyeIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {Group} from '../../../../models/Group';

type GroupListCardItemMenuProps = {
  group: Group;
  item: Item;
};

const GroupListCardItemMenu = ({group, item}: GroupListCardItemMenuProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToItemView = (): void => navigation.navigate('ItemView', {itemId: item.id, colorScheme: group.color});

  return (
    <PressableButton onPress={goToItemView}>
      <EyeIcon color="primary.500" size="6" />
    </PressableButton>
  );
};

export default GroupListCardItemMenu;
