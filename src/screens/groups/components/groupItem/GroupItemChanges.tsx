import React, {useCallback} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import DateView from '../../../../components/views/DateView';

type GroupItemChangesProps = {
  item: Item;
};

const GroupItemChanges = ({item}: GroupItemChangesProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, item.createdBy));

  const date = new Date(item.createdAt);

  return (
    <Text fontSize="xs" color="gray.400">
      {user?.username} / <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
    </Text>
  );
};

export default GroupItemChanges;
