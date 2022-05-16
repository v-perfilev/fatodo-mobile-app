import React, {useMemo} from 'react';
import {Item} from '../../../../models/Item';
import {Text} from 'native-base';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/surfaces/FHStack';

type GroupViewItemChangesProps = {
  item: Item;
};

const GroupViewItemChanges = ({item}: GroupViewItemChangesProps) => {
  const {users} = useUserListContext();

  const name = useMemo<string>(() => {
    const user = users.find((user) => user.id === item.createdBy);
    return user?.username;
  }, [users]);

  const formattedDate = useMemo<string>(() => {
    const timestampToDate = (timestamp: number): Date => new Date(timestamp * 1000);
    return DateFormatters.formatDependsOnDay(timestampToDate(item.createdAt));
  }, [item]);

  const textProps = {color: 'gray.400', fontSize: '11'};

  return (
    <FHStack space="1">
      <Text {...textProps}>{name}</Text>
      <Text {...textProps}>/</Text>
      <Text {...textProps}>{formattedDate}</Text>
    </FHStack>
  );
};

export default GroupViewItemChanges;
