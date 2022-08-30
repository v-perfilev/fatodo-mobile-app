import React from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';

type GroupViewItemChangesProps = {
  item: Item;
};

const GroupViewItemChanges = ({item}: GroupViewItemChangesProps) => {
  const users = useAppSelector(InfoSelectors.users);

  const name = users.get(item.createdBy)?.username;

  const formattedDate = DateFormatters.formatDependsOnDay(new Date(item.createdAt));

  const textProps = {color: 'gray.400', fontSize: '11'};

  return (
    <FHStack smallSpace>
      <Text {...textProps}>{name}</Text>
      <Text {...textProps}>/</Text>
      <Text {...textProps}>{formattedDate}</Text>
    </FHStack>
  );
};

export default GroupViewItemChanges;
