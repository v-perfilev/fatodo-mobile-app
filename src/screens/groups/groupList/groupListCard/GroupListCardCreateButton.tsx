import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {Group} from '../../../../models/Group';
import IconButton from '../../../../components/controls/IconButton';
import {IIconButtonProps} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../../navigators/GroupNavigator';
import PlusIcon from '../../../../components/icons/PlusIcon';

type GroupListCardCreateButtonProps = IIconButtonProps & {
  group: Group;
};

const GroupListCardCreateButton = ({group, ...props}: GroupListCardCreateButtonProps) => {
  const navigation = useNavigation<GroupNavigationProps>();

  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {group});

  const handlePress = (e: GestureResponderEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    goToItemCreate();
  };

  return <IconButton size="xl" icon={<PlusIcon />} onPress={handlePress} {...props} />;
};

export default GroupListCardCreateButton;
