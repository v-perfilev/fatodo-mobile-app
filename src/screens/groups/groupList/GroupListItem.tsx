import React, {FC} from 'react';
import {Box} from 'native-base';
import {Group} from '../../../models/Group';

type GroupListItemProps = {
  group: Group;
};

const GroupListItem: FC<GroupListItemProps> = ({group}) => {
  return <Box>{group.title}</Box>;
};

export default GroupListItem;
