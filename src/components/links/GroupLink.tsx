import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupInfo} from '../../models/Group';
import {Text} from 'native-base';
import {TabNavigationProps} from '../../navigators/TabNavigator';

type GroupLinkProps = {
  group?: GroupInfo;
  color?: string;
  noLink?: boolean;
};

export const GroupLink = ({group, color = 'primary.500', noLink}: GroupLinkProps) => {
  const navigation = useNavigation<TabNavigationProps>();

  const goToGroup = (): void => navigation.navigate('Groups', {screen: 'GroupView', params: {groupId: group?.id}});

  return group ? (
    <Text color={!noLink ? color : undefined} onPress={!noLink ? goToGroup : undefined}>
      {group.title}
    </Text>
  ) : undefined;
};

export default GroupLink;
