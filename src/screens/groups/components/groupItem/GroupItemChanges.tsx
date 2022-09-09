import React, {useMemo} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';

type GroupItemChangesProps = {
  item: Item;
};

const GroupItemChanges = ({item}: GroupItemChangesProps) => {
  const users = useAppSelector(InfoSelectors.users);

  const name = useMemo<string>(() => users.get(item.createdBy)?.username, [users.get(item.createdBy)]);
  const formattedDate = useMemo<string>(() => DateFormatters.formatDependsOnDay(new Date(item.createdAt)), []);
  const textProps = {color: 'gray.400', fontSize: '11'};

  return (
    <FHStack smallSpace>
      <Text {...textProps}>{name}</Text>
      <Text {...textProps}>/</Text>
      <Text {...textProps}>{formattedDate}</Text>
    </FHStack>
  );
};

export default GroupItemChanges;
