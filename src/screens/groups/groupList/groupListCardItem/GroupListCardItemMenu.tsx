import React from 'react';
import {Item} from '../../../../models/Item';
import EyeIcon from '../../../../components/icons/EyeIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {Group} from '../../../../models/Group';
import IconButton from '../../../../components/controls/IconButton';

type GroupListCardItemMenuProps = {
  group: Group;
  item: Item;
};

const GroupListCardItemMenu = ({group, item}: GroupListCardItemMenuProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToItemView = (): void => navigation.navigate('ItemView', {itemId: item.id, colorScheme: group.color});

  return <IconButton p="1.5" bgTransparency="5" icon={<EyeIcon />} onPress={goToItemView} />;
};

export default GroupListCardItemMenu;
