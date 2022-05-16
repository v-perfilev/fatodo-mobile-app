import React, {memo} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import GroupListCardItemIcons from './GroupListCardItemIcons';
import GroupListCardItemChanges from './GroupListCardItemChanges';
import GroupListCardItemMenu from './GroupListCardItemMenu';
import {flowRight} from 'lodash';
import FVStack from '../../../../components/surfaces/FVStack';
import FHStack from '../../../../components/surfaces/FHStack';

type GroupListCardItemProps = {
  item: Item;
};

const GroupListCardItem = ({item}: GroupListCardItemProps) => {
  return (
    <FHStack space="2" p="1" borderWidth="1" borderColor="gray.200" borderRadius="2" alignItems="center">
      <GroupListCardItemIcons item={item} />
      <FVStack grow>
        <Text isTruncated lineHeight="18">
          {item.title}
        </Text>
        <GroupListCardItemChanges item={item} />
      </FVStack>
      <GroupListCardItemMenu item={item} />
    </FHStack>
  );
};

export default flowRight([memo])(GroupListCardItem);
