import React, {useCallback} from 'react';
import {Item} from '../../../models/Item';
import {Group} from '../../../models/Group';
import BoxWithIcon from '../../../components/surfaces/BoxWithIcon';
import AlarmIcon from '../../../components/icons/AlarmIcon';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import FHStack from '../../../components/boxes/FHStack';
import InfoSelectors from '../../../store/info/infoSelectors';
import {useAppSelector} from '../../../store/store';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProps} from '../../../navigators/ProtectedNavigator';
import PriorityView from '../../../components/views/PriorityView';

type GroupItemCountersProps = {
  group: Group;
  item: Item;
};

const GroupItemGroup = ({group, item}: GroupItemCountersProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, item.id));

  const rootNavigation = useNavigation<ProtectedNavigationProps>();

  const goToComments = (): void =>
    rootNavigation.navigate('CommentList', {
      targetId: item.id,
      colorScheme: group.color,
    });

  return (
    <FHStack space="3">
      <PriorityView withoutText priority={item.priority} fontSize="xs" colorScheme={group.color} fontColor="gray.400" />
      {item.remindersCount > 0 && (
        <BoxWithIcon icon={<AlarmIcon color={`${group.color}.500`} size="sm" />} text={item.remindersCount} />
      )}
      <BoxWithIcon
        icon={<CommentsIcon color={`${group.color}.500`} size="sm" />}
        text={commentThread?.count || 0}
        onPress={goToComments}
      />
    </FHStack>
  );
};

export default GroupItemGroup;
