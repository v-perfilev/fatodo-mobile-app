import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {Box, IBoxProps, Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Group} from '../../../../models/Group';
import StatusView from '../../../../components/views/StatusView';
import PriorityView from '../../../../components/views/PriorityView';
import TypeView from '../../../../components/views/TypeView';
import CommentsIcon from '../../../../components/icons/CommentsIcon';
import GroupItemMenu from './GroupItemMenu';
import GroupItemChanges from './GroupItemChanges';
import BoxWithIcon from '../../../../components/surfaces/BoxWithIcon';
import AlarmIcon from '../../../../components/icons/AlarmIcon';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {useAppSelector} from '../../../../store/store';
import PressableButton from '../../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {RootNavigationProp} from '../../../../navigators/RootNavigator';

type GroupItemProps = IBoxProps & {
  item: Item;
  group: Group;
  canEdit: boolean;
};

const GroupItem = ({item, group, canEdit, ...props}: GroupItemProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, item.id));
  const rootNavigation = useNavigation<RootNavigationProp>();
  const groupNavigation = useNavigation<GroupNavigationProp>();

  const goToItemView = (): void => groupNavigation.navigate('ItemView', {group, item});
  const goToComments = (): void =>
    rootNavigation.navigate('CommentList', {
      targetId: item.id,
      colorScheme: group.color,
    });

  return (
    <PressableButton onPress={goToItemView}>
      <FVStack p="4" defaultSpace {...props}>
        <FHStack>
          <FVStack grow defaultSpace>
            <Text fontSize="16" numberOfLines={2} isTruncated>
              {item.title}
            </Text>
            <GroupItemChanges item={item} />
          </FVStack>
          <Box>
            <GroupItemMenu group={group} item={item} canEdit={canEdit} />
          </Box>
        </FHStack>
        <Box flexDirection="row">
          <FHStack grow defaultSpace>
            <TypeView type={item.type} fontColor="gray.400" />
            <PriorityView priority={item.priority} fontColor="gray.400" />
            <StatusView statusType={item.status} fontColor="gray.400" />
          </FHStack>
          <FHStack defaultSpace>
            {item.remindersCount > 0 && (
              <BoxWithIcon icon={<AlarmIcon color="primary.500" size="md" />}>{item.remindersCount}</BoxWithIcon>
            )}
            <BoxWithIcon icon={<CommentsIcon color="primary.500" size="md" />} onPress={goToComments}>
              {commentThread?.count || 0}
            </BoxWithIcon>
          </FHStack>
        </Box>
      </FVStack>
    </PressableButton>
  );
};

export default GroupItem;
