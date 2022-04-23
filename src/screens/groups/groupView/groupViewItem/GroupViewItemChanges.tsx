import React, {FC, useMemo} from 'react';
import {Item} from '../../../../models/Item';
import {HStack, Text} from 'native-base';
import {useUserListContext} from '../../../../shared/contexts/listContexts/userListContext';
import {DateFormatters} from '../../../../shared/utils/DateUtils';

type GroupViewItemChangesProps = {
  item: Item;
};

const GroupViewItemChanges: FC<GroupViewItemChangesProps> = ({item}) => {
  const {users} = useUserListContext();

  const name = useMemo<string>(() => {
    const user = users.find((user) => user.id === item.createdBy);
    return user?.username;
  }, [users]);

  const formattedDate = useMemo<string>(() => {
    const timestampToDate = (timestamp: number): Date => new Date(timestamp * 1000);
    return DateFormatters.formatDependsOnDay(timestampToDate(item.createdAt));
  }, [item]);

  return (
    <HStack>
      <Text color="gray.400" fontSize="11">
        {name}
      </Text>
      <Text color="gray.400" mx="1" fontSize="11">
        /
      </Text>
      <Text color="gray.400" fontSize="11">
        {formattedDate}
      </Text>
    </HStack>
  );
};

export default GroupViewItemChanges;
