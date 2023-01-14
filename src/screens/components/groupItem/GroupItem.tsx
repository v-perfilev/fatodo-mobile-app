import React from 'react';
import {Item} from '../../../models/Item';
import {IBoxProps, Text} from 'native-base';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {Group} from '../../../models/Group';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import GroupItemDate from './GroupItemDate';
import GroupItemGroup from './GroupItemGroup';
import GroupItemCounters from './GroupItemCounters';
import FBox from '../../../components/boxes/FBox';
import GroupItemDoneCheckbox from './GroupItemDoneCheckbox';

type GroupItemProps = IBoxProps & {
  item: Item;
  group: Group;
  canEdit: boolean;
  showGroup?: boolean;
};

const GroupItem = ({item, group, showGroup, canEdit, ...props}: GroupItemProps) => {
  const groupNavigation = useNavigation<GroupNavigationProps>();

  const goToItemView = (): void => groupNavigation.navigate('ItemView', {group, item});

  return (
    <PressableButton onPress={goToItemView}>
      <FHStack grow p="4" space="3" alignItems="center" {...props}>
        <GroupItemDoneCheckbox group={group} item={item} canEdit={canEdit} />
        <FVStack grow space="2" justifyContent="center">
          <Text fontSize="lg" numberOfLines={2} isTruncated>
            {item.title}
          </Text>
          {showGroup && (
            <FHStack grow>
              <GroupItemGroup group={group} />
              <FBox grow />
            </FHStack>
          )}
        </FVStack>
        <FVStack h="100%" justifyContent="space-between" alignItems="flex-end" space="3" py="0.5">
          <GroupItemDate item={item} />
          <GroupItemCounters group={group} item={item} />
        </FVStack>
      </FHStack>
    </PressableButton>
  );
};

export default GroupItem;
