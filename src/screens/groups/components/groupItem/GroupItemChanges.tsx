import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import DateView from '../../../../components/views/DateView';
import UserLink from '../../../../components/links/UserLink';
import {Group} from '../../../../models/Group';

type GroupItemChangesProps = {
  group: Group;
  item: Item;
};

const GroupItemChanges = ({group, item}: GroupItemChangesProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, item.createdBy));

  const date = new Date(item.createdAt);

  return (
    <Text fontSize="xs" color="gray.400">
      <UserLink user={user} color={`${group.color}.500`} /> /{' '}
      <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
    </Text>
  );
};

export default GroupItemChanges;
