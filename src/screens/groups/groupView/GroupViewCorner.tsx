import React from 'react';
import CornerButton from '../../../components/controls/CornerButton';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import {useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';

const GroupViewCorner = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const group = useAppSelector(GroupSelectors.group);

  const goToComments = (): void => navigation.navigate('CommentsView', {targetId: group.id, colorScheme: group.color});

  return <CornerButton size="lg" p="3" icon={<CommentsIcon />} onPress={goToComments} />;
};

export default GroupViewCorner;
