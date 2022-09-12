import React, {useCallback, useMemo} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';

type GroupItemChangesProps = {
  item: Item;
};

const GroupItemChanges = ({item}: GroupItemChangesProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, item.createdBy));

  const formattedDate = useMemo<string>(() => DateFormatters.formatDependsOnDay(new Date(item.createdAt)), []);

  return (
    <Text fontSize="11" color="gray.400">
      {user?.username} / {formattedDate}
    </Text>
  );
};

export default GroupItemChanges;
