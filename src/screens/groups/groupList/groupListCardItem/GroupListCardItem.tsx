import React, {memo} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import GroupListCardItemIcons from './GroupListCardItemIcons';
import GroupListCardItemChanges from './GroupListCardItemChanges';
import GroupListCardItemMenu from './GroupListCardItemMenu';
import {flowRight} from 'lodash';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Group} from '../../../../models/Group';

type GroupListCardItemProps = {
  group: Group;
  item: Item;
};

const GroupListCardItem = ({group, item}: GroupListCardItemProps) => {
  return (
    <FHStack space="2" p="1" borderWidth="1" borderColor="gray.200" borderRadius="2" alignItems="center">
      <GroupListCardItemIcons item={item} />
      <FVStack grow>
        <Text isTruncated lineHeight="18">
          {item.title}
        </Text>
        <GroupListCardItemChanges item={item} />
      </FVStack>
      <GroupListCardItemMenu group={group} item={item} />
    </FHStack>
  );
};

export default flowRight([memo])(GroupListCardItem);
