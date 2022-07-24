import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PressableButton from '../controls/PressableButton';
import {GroupInfo} from '../../models/Group';
import {GroupNavigationProp} from '../../navigators/GroupNavigator';
import {Text} from 'native-base';

type GroupLinkProps = {
  group: GroupInfo;
};

export const GroupLink = ({group}: GroupLinkProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToGroup = (): void => navigation.navigate('GroupView', {groupId: group.id});

  return (
    <PressableButton onPress={goToGroup}>
      <Text color="primary.500">{group.title}</Text>
    </PressableButton>
  );
};

export default GroupLink;
