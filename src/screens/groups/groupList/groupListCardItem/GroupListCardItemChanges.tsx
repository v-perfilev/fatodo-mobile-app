import React, {useMemo} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';

type GroupListCardItemChangesProps = {
  item: Item;
};

const GroupListCardItemChanges = ({item}: GroupListCardItemChangesProps) => {
  const users = useAppSelector(InfoSelectors.users);

  const name = useMemo<string>(() => {
    const user = users.get(item.createdBy);
    return user?.username;
  }, [users]);

  const formattedDate = useMemo<string>(() => {
    const timestampToDate = (timestamp: number): Date => new Date(timestamp);
    return DateFormatters.formatDependsOnDay(timestampToDate(item.createdAt));
  }, [item]);

  const textProps = {color: 'gray.400', fontSize: '11'};

  return (
    <FHStack smallSpace>
      <Text {...textProps}>{name}</Text>
      <Text {...textProps}>/</Text>
      <Text {...textProps}>{formattedDate}</Text>
    </FHStack>
  );
};

export default GroupListCardItemChanges;
