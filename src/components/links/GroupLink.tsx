import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupInfo} from '../../models/Group';
import {Text} from 'native-base';
import {TabNavigationProp} from '../../navigators/TabNavigator';

type GroupLinkProps = {
  group: GroupInfo;
  color?: string;
};

export const GroupLink = ({group, color = 'primary.500'}: GroupLinkProps) => {
  const navigation = useNavigation<TabNavigationProp>();

  const goToGroup = (): void => navigation.navigate('Groups', {screen: 'GroupView', params: {groupId: group.id}});

  return (
    <Text color={color} onPress={goToGroup}>
      {group.title}
    </Text>
  );
};

export default GroupLink;
