import React, {FC} from 'react';
import {Item} from '../../../../models/Item';
import PressableButton from '../../../../components/controls/PressableButton';
import EyeIcon from '../../../../components/icons/EyeIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {HStack} from 'native-base';

type GroupViewItemMenuProps = {
  item: Item;
};

const GroupViewItemMenu: FC<GroupViewItemMenuProps> = ({item}) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToItemView = (): void => {
    navigation.navigate('ItemView', {itemId: item.id});
  };

  return (
    <HStack ml="1" alignItems="center">
      <PressableButton ml="1" onPress={goToItemView}>
        <EyeIcon color="primary.500" size="6" />
      </PressableButton>
    </HStack>
  );
};

export default GroupViewItemMenu;
