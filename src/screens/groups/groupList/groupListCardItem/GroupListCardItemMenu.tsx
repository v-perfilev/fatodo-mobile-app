import React from 'react';
import {Item} from '../../../../models/Item';
import PressableButton from '../../../../components/controls/PressableButton';
import EyeIcon from '../../../../components/icons/EyeIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';

type GroupListCardItemMenuProps = {
  item: Item;
};

const GroupListCardItemMenu = ({item}: GroupListCardItemMenuProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToItemView = (): void => {
    navigation.navigate('ItemView', {itemId: item.id});
  };

  return (
    <PressableButton onPress={goToItemView}>
      <EyeIcon color="primary.500" size="6" />
    </PressableButton>
  );
};

export default GroupListCardItemMenu;
